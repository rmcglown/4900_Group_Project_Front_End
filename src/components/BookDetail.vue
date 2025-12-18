<template>
  <div class="container mt-4" v-if="book">
    <h2>{{ book.title }}</h2>

    <p><strong>Author:</strong> {{ book.author_name }}</p>
    <p><strong>Genre:</strong> {{ book.genre }}</p>
    <p><strong>Publication Date:</strong> {{ book.publication_date }}</p>

    <div class="mt-4">
      <h5>Description</h5>
      <p v-if="book.description">
        {{ book.description }}
      </p>
      <p v-else class="text-muted">
        No description available.
      </p>
    </div>

    <div v-if="book.book_image">
      <img
        :src="`${URL}${book.book_image}`"
        class="img-thumbnail"
        alt="Book image"
      />
    </div>
    <div v-else>
      <img
        src="@/assets/book_logo.jpg"
        class="img-thumbnail"
        alt="No image"
      />
    </div>
  </div>

  <div v-else class="text-center">
    Loading book details...
  </div>
</template>

<script>
import { APIService } from "@/http/APIService";
import { API_URL } from "@/http/APIService";

const apiService = new APIService();

export default {
  props: ["id"],

  data() {
    return {
      book: null,
      URL: API_URL,
    };
  },

  mounted() {
    this.getBook();
  },

  methods: {
    getBook() {
      apiService.getBook(this.id)
        .then((response) => {
          this.book = response.data;
        })
        .catch(() => {
          this.$router.push("/book-list");
        });
    },
  },
};
</script>

mounted() {
  console.log("Route params:", this.$route.params);
  console.log("ID prop:", this.id);
  this.getBook();
}

