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

    <div class="mt-4">
      <h5>Available Copies</h5>

      <div v-if="copies.length">
        <select v-model="selectedCopy" class="form-select mb-2">
          <option disabled value="">Select a copy</option>
          <option
            v-for="copy in copies"
            :key="copy.pk"
            :value="copy.pk"
            :disabled="copy.status !== 'available'"
          >
            Copy {{ copy.pk }}
            <span v-if="copy.status !== 'available'">(Checked out)</span>
          </option>
        </select>

        <button
          class="btn btn-primary"
          :disabled="!selectedCopy"
          @click="checkoutCopy"
        >
          Checkout
        </button>
      </div>

      <p v-else class="text-muted">
        No copies available for this book.
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
      copies: [],
      selectedCopy: "",
      URL: API_URL,
    };
  },

  mounted() {
    this.getBook();
    this.getCopies();
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
    getCopies() {
      apiService.getBookCopies(this.id)
        .then((response) => {
          this.copies = response.data;
        })
        .catch(() => {
          this.copies =[];
        });
    },

    checkoutCopy() {
      apiService.checkoutCopy(this.selectedCopy)
        .then(() => {
          alert("Book checked out successfully!");
          this.selectedCopy = "";
          this.getCopies();
        })
        .catch(() => {
          alert("Unable to checkout this copy.");
        });
    },
  },
};
</script>



