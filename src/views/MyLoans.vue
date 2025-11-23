<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">My Loaned Books</h1>

    <div v-if="loading">Loading your loans...</div>
    <div v-if="error" class="text-red-600">{{ error }}</div>

    <table v-if="!loading && loans.length > 0" class="table-auto w-full mt-4 border">
      <thead>
        <tr class="bg-gray-100">
          <th class="p-2 border">Title</th>
          <th class="p-2 border">Author</th>
          <th class="p-2 border">Due Date</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="loan in loans" :key="loan.id" class="text-center">
          <td class="p-2 border">{{ loan.title }}</td>
          <td class="p-2 border">{{ loan.author }}</td>
          <td class="p-2 border">{{ loan.due_date }}</td>
        </tr>
      </tbody>
    </table>

    <div v-if="!loading && loans.length === 0">
      You currently have no books on loan.
    </div>
  </div>
</template>

<script>
import APIService from "../http/APIService";

export default {
  name: "MyLoans",
  data() {
    return {
      loans: [],
      loading: true,
      error: null,
    };
  },
  async created() {
    try {
      const response = await APIService.getMyLoans();
      this.loans = response;
    } catch (err) {
      this.error = "Failed to fetch loaned books.";
    } finally {
      this.loading = false;
    }
  },
};
</script>
