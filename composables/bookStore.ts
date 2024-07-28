import { defineStore } from "pinia";
import { type IBook } from "~~/types";
import useToast from "./useToast";

export const useBookStore = defineStore("book-store", {
  state: () => ({
    books: [] as IBook[],
  }),

  actions: {
    // Get all authors from DB
    async getAll() {
      try {
        let data = await $fetch<IBook[]>("/api/books");
        this.books = data;
        return data as IBook[];
      } catch (e) {
        if (e instanceof Error) {
          useToast().error(e.message);
        }
      }
    },

    // Create a new author
    async create(name: string) {
      await $fetch("/api/books/create", {
        method: "POST",
        body: { name },
      })
        .catch((e) => {
          useToast().error(e.data.message);
        })
        .then(async () => {
          await this.getAll();
          useToast().success("Book created");
        });
    },

    // Update an author
    async update(id: string, name: string) {
      await $fetch(`/api/books/${id}`, {
        method: "PUT",
        body: { name },
      })
        .catch((e) => {
          useToast().error(e.data.message);
        })
        .then(async () => {
          await this.getAll();
          useToast().success("Book updated");
        });
    },

    // delete an author
    async remove(id: string) {
      await $fetch(`/api/books/${id}`, {
        method: "DELETE",
      })
        .catch((e) => {
          useToast().error(e.data.message);
        })
        .then(async () => {
          await this.getAll();
          useToast().success("Book removed");
        });
    },
  },
});
