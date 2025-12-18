<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">Add New Book</h1>

    <form @submit.prevent="submitBook" class="space-y-4 max-w-md">

      <div>
        <label class="block font-medium">Title</label>
        <input v-model="title" type="text" class="border p-2 w-full" required />
      </div>

      <div>
        <label class="block font-medium">Author</label>
        <input v-model="author" type="text" class="border p-2 w-full" required />
      </div>

      <div>
        <label class="block font-medium">Description</label>
        <textarea v-model="description" class="border p-2 w-full"></textarea>
      </div>

      <div>
        <label class="block font-medium">Genre</label>
        <input v-model="genre" type="text" class="border p-2 w-full" required />
      </div>

      <div>
        <label class="block font-medium">Publication Date</label>
        <input v-model="publication_date" type="Date" class="border p-2 w-full" required />
      </div>

      <div>
        <label class="block font-medium">ISBN</label>
        <input v-model="isbn" type="text" class="border p-2 w-full" required />
      </div>

      <button
        type="submit"
        class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Add Book
      </button>

      <p v-if="success" class="text-green-600 mt-2">Book added successfully!</p>
      <p v-if="error" class="text-red-600 mt-2">{{ error }}</p>

    </form>
  </div>
</template>

<script>
import { APIService } from "../http/APIService";
const apiService = new APIService();

export default {
  name: "AddBook",
  data() {
    return {
      title: "",
      author: "",
      description: "",
      genre: "",
      publication_date: "",
      isbn: "",
      success: false,
      error: null,
    };
  },
  methods: {
    async submitBook() {
      this.success = false;
      this.error = null;

      const bookData = {
        title: this.title,
        author: this.author,
        description: this.description,
        genre: this.genre,
        publication_date: this.publication_date,
        isbn: this.isbn
      };

      try {
        await apiService.addNewBook(bookData);
        this.success = true;

        this.title = "";
        this.author = "";
        this.description = "";
        this.genre = "";
        this.publication_date = "";
        this.isbn = "";

      } catch (err) {
        if (err.response) {
          if (err.response.status === 401 || err.response.status === 403){
            this.error = "You are not authorized to add books.";
          }else if (err.response.status === 400){
            this.error = "Invalid book data. Please check your inputs.";
          }else {
            this.error = "Unable to add book.";
          }
        }else {
          this.error = "unauthorized.";
        }
      }
    }
  }
};
</script>
