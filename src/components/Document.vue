<script setup>

const props = defineProps({
  doc: {
    type: Object,
    default: () => {},
  },
  index: {
    type: Number,
    default: 0,
  },
});

defineEmits(["edit-doc", "update-doc", "delete-doc"]);
</script>

<template>
 <li>
    <div class="doc">
      <input
        v-if="doc.isEditing"
        type="text"
        v-model="doc.description"
      />
      <span
        v-else
        :class="{
          'expired-doc': doc.isExpired,
        }"
      >
        {{ doc.description + 
            (doc.expiration != undefined ? 
                (": " + doc.expiration.
                  substring(3, 15).trim())
                : 
                ""
            ) 
        }}
      </span>
    </div>
    <div class="doc-actions">
      <button
        v-if="doc.isEditing"
        @click="$emit('update-doc', doc.description, index)"
      >
        Save
      </button>
      <button
        v-else
        @click="$emit('edit-doc', index)"
      >
        Edit
      </button>
      <button
        @click="$emit('delete-doc', doc.id)"
      >
        Delete
      </button>
    </div>
  </li>
</template>

<style lang="scss" scoped>
li {
  background-color: #bfffff;
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 20px 15px;

  &:hover {
    .doc-actions {
      opacity: 1;
    }
  }

  .doc {
    flex: 1;

    .expired-doc {
      text-decoration: line-through;
    }

    input[type="text"] {
      border: 2px solid #edfaff;
      width: 100%;
      padding: 3px 8px;
    }
  }

  .doc-actions {
    transition: 105ms ease-in-out;
    display: flex;
    gap: 3px;
    opacity: 0;

    .icon {
      cursor: pointer;
    }
  }
}
</style>