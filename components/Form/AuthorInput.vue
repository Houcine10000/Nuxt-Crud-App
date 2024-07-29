<template>
  <Combobox v-slot="{ open }" multiple>
    <div class="relative">
      <ComboboxLabel class="label">Authors</ComboboxLabel>

      <div class="relative">
        <ComboboxInput
          aria-placeholder="Search here..."
          class="input"
          @change="query = $event.target.value"
          :display-value="getDisplay"
        />

        <span class="absolute top-2 right-2">
          <ComboboxButton>
            <Icon
              class="transition-all duration-300"
              :class="[open ? 'rotate-180' : '']"
              name="fluent:chevron-down-24-regular"
              size="20"
            />
          </ComboboxButton>
        </span>
      </div>

      <ComboboxOptions
        class="absolute w-full bg-white border border-gray-100 rounded-md shadow-lg"
      >
        <div
          v-if="filteredAuthors.length === 0 && query !== ''"
          class="relative px-2 py-4 text-center text-gray-500 cursor-default select-none"
        >
          No Author Found
        </div>

        <!-- Filtered authors -->
        <ComboboxOption
          as="template"
          v-for="author in filteredAuthors"
          :key="author._id"
          :value="author._id"
        >
          <li
            class="px-3 py-2.5 cursor-pointer ui-active:bg-orange-50 ui-selected:bg-orange-500 ui-selected:text-white"
          >
            <span class="block text-sm truncate ui-active:text-orange-500">
              {{ author.name }}
            </span>
          </li>
        </ComboboxOption>
      </ComboboxOptions>
    </div>
  </Combobox>
</template>

<script setup>
import {
  ComboboxLabel,
  Combobox,
  ComboboxInput,
  ComboboxOptions,
  ComboboxOption,
  ComboboxButton,
} from "@headlessui/vue";

// instantiate the author store
const authorStore = useAuthorStore();

// get the authors
useAsyncData(() => authorStore.getAll(), { initialCache: false });

// search value
const query = ref("");

// Method used to display the text inside the input
const getDisplay = (authors) => {
  // if empty
  if (!authors.length) return;

  // get first author name
  let firstAuthor = authorStore.authors.find((a) => a._id == authors[0])?.name;

  // if we have more than one selected, return the first & the extras
  if (authors.length > 1) {
    return `${firstAuthor} + ${authors.length - 1} more`;
  }

  // if only one is selected, return that one
  return firstAuthor;
};

// Simple search function to find the authors
const filteredAuthors = computed(() =>
  query.value === ""
    ? authorStore.authors
    : authorStore.authors.filter((a) => {
        return a.name.toLowerCase().includes(query.value.toLowerCase());
      })
);
</script>
