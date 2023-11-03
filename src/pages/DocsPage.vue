<script setup>
//import { ref } from "vue";
import { ref, onMounted } from "vue"; //
import { uid } from "uid";
import DocInput from '../components/DocInput.vue';
import Document from '../components/Document.vue'; 

import { collection, doc, onSnapshot, 
    addDoc, updateDoc, deleteDoc,
    query, orderBy } from "firebase/firestore"; //

import { db } from '../firebase.js'; //

const docsList = ref([]);
const docsQuery = query(collection(db, "docs"), orderBy("due", "asc"));

// 
onMounted(() => {
    onSnapshot(docsQuery, (querySnapshot) => {
        docsList.value = []
        querySnapshot.forEach((doc) => {
            const d = {
                id: doc.id,
                description: doc.data().description,
                expiration: doc.data().expiration,
                isExpired: doc.data().isExpired,
                isEditing: doc.data().isEditing
            }
            docsList.value.push(d);
        });
    });
}); 

//
const createDoc = async (description, expiration) => {
    const today = new Date();
    const xYears = new Date(today.setFullYear(today.getFullYear() + 10));

    const d = (expiration == undefined) ? {
        id: uid(),
        description,
        expiration: xYears.toString(),
        isExpired: false,
        isEditing: false,
        due: xYears
    }
    :
    {
        id: uid(),
        description,
        expiration: expiration.toString(),
        isExpired: false,
        isEditing: false,
        due: new Date(expiration.toString().substring(3, 15).trim())
    };
    
    const ndoc = await addDoc(collection(db, "docs"), d); 
    
    updateDoc(ndoc, {
        id: ndoc.id
    });
}

const toggleEdit = (docIdx) => {
    docsList.value[docIdx].isEditing = !docsList.value[docIdx].isEditing;
}

//
const updateDocument = async (d, docIdx) => {
    toggleEdit(docIdx);

    docsList.value[docIdx].description = d;

    const dc = await doc(db, "docs", docsList.value[docIdx].id); 
    
    updateDoc(dc, {
        description: d
    });
}

// 
const deleteDocument = async (id) => {
    docsList.value = docsList.value.filter(
        (doc) => doc.id != id
    );

    await deleteDoc(doc(db, "docs", id));
}
</script>

<template>
    <main>
        <DocInput @create-doc="createDoc" />
        <ul>
            <Document 
                :doc="doc" 
                v-for="(doc, index) in docsList" 
                :key="doc.id"
                :index="index"
                @edit-doc="toggleEdit" 
                @update-doc="updateDocument"
                @delete-doc="deleteDocument"
            />
        </ul>
    </main>
</template>

<style lang="scss" scoped>
main {
    h1 {
        text-align: center;
        margin-bottom: 18px;
    }
    
    margin: 0 auto;
    width: 100%;
    max-width: 500px;
    display: flex;
    flex-direction: column;
    padding: 30px 15px;

    .docs-list {
        display: flex;
        flex-direction: column;
        gap: 18px;
        list-style: none;
        margin-top: 25px;
    }

    .docs-msg {
        align-items: center;
        justify-content: center;
        display: flex;
        gap: 10px;
        margin-top: 25px;
    }
}
</style>