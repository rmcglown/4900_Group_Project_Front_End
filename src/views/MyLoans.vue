<template>
  <div class="page">
    <h1>My Loaned Books</h1>

    <p v-if="loading">Loading your loans...</p>
    <p v-else-if="error" class="error">{{ error }}</p>
    <p v-else-if="loans.length === 0">You currently have no books on loan.</p>

    <table v-else class="table">
      <thead>
        <tr>
          <th>Loan ID</th>
          <th>Copy ID</th>
          <th>Book Title</th>
          <th>Due Date</th>
          <th>Status</th>
          <th>Fine Paid</th>
          <th>Fine Paid Amount</th>
          <th>Outstanding Fine</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="loan in loans" :key="loan.pk">
          <td>{{ loan.pk }}</td>
          <td>{{ loan.copy }}</td>
          <td>
            <router-link :to="`/book-detail/${loan.book_id}`">
              {{ loan.book_title }}
            </router-link></td>
          <td>{{ loan.due_date }}</td>
          <td>{{ loan.status }}</td>
          <td>{{ loan.fine_paid ? "Yes" : "No" }}</td>
          <td>${{ money(loan.fine_paid_amount) }}</td>
          <td>${{ money(loan.outstanding_fine) }}</td>
          <td>
            <button v-if="loan.status !== 'returned'" @click="returnLoan(loan.pk)" class="btn btn-sm btn-outline-primary">
              Return
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { APIService } from "@/http/APIService";

export default {
  name: "MyLoans",
  data() {
    return {
      loans: [],
      loading: false,
      error: "",
      api: new APIService(),
    };
  },
  async mounted() {
    await this.loadLoans();
  },
  methods: {
    money(v) {
      const n = Number(v);
      if (Number.isNaN(n)) return "0.00";
      return n.toFixed(2);
    },
    async loadLoans() {
      this.loading = true;
      this.error = "";
      try {
        const res = await this.api.getMyLoans();
        // backend returns { data: [...] }
        this.loans = res.data?.data ?? [];
      } catch (err) {
        console.error(err);
        this.error =
          err?.response?.data?.detail ||
          "Failed to fetch loaned books.";
        this.loans = [];
      } finally {
        this.loading = false;
      }
    },
    async returnLoan(loanId) {
      try {
        await this.api.returnBook(loanId);
        alert("Book returned successfully!");
        await this.loadLoans();
      } catch (err) {
        console.error(err);
        this.error =
          err?.response?.data?.detail ||
          "Failed to return loan.";
        this.loans = [];
      }
    }
  },
};
</script>