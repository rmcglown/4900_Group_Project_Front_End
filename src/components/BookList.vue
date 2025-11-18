<template>
    <div class="container-fluid">
        <div class="row align-items-center justify-content-center">
            <div class="col col-12 align-items-center justify-content-center">
                <blockquote>
                    Welcome {{ validUserName }}!
                    <footer>
                        <small>
                            <em>&mdash; Every great film should seem new every time you see it.- Roger Ebert</em>
                        </small>
                    </footer>
                </blockquote>
            </div>
            <div class="col-12 col-md-10 col-lg-10 col-12 align-items-center justify-content-center">
                <div class="alert alert-success"
                     v-if="showMsg === 'new'"
                     :value="true">
                    New book has been added.
                </div>
                <div class="alert alert-success"
                     v-if="showMsg === 'update'"
                     :value="true">
                    Book information has been updated.
                </div>
                <div class="alert alert-success"
                     v-if="showMsg === 'deleted'"
                     :value="true">
                    Selected Book has been deleted.
                </div>
            </div>
        </div>
        <!--Mobile device view-->
        <div class="d-md-none" id="collapsable-card" style="width: 80%">
            <button v-if="this.authenticated === 'true'" type="button" class="btn btn-primary" @click="addNewBook">
                <font-awesome-icon icon="plus"/>
            </button>
            <div class="card" v-for="book in books" v-bind:key="book">
                <div class="card-header" :id="'heading' + book.title">
                    <button class="btn btn-link collapsed" data-bs-toggle="collapse"
                            :data-bs-target="'#collapse' + book.pk"
                            aria-expanded="true" :aria-controls="'collapse' + book.pk">
                        <h6 style="color: #0275d8; float: left">{{ book.title }}</h6>
                    </button>
                </div>
                <div :id="'collapse' + book.pk" class="collapse" :aria-labelledby="'heading' + 
                            book.pk" data-bs-parent="#collapsable-card">
                    <div class="card-body">
                        <p><b>Title:</b> {{ book.title }}</p>
                        <p><b>Author:</b>{{ book.author }}</p>
                       <div v-if="book.book" class="book-image">
                            <p><img :src="`${URL}${book.book}`" alt="Book Picture" class="img-thumbnail"/></p>
                        </div>
                        <div v-else class="book-image">
                            <img :src="require('@/assets/book_logo.jpg')" class="img-fluid" alt="Responsive image"/>
                        </div>
                        <p><b>Genre:</b> {{ book.genre }}</p>
                        <p><b>Publication Date:</b> {{ book.publication_date }}</p>
                        <div v-if="this.authenticated === 'true'" class="btn-group">
                            <button @click="updateBook(book)" style="background-color: transparent; padding: 5;">
                                <font-awesome-icon icon="pencil"/>
                            </button>
                            <button @click="deleteBook(book)" style="background-color: transparent; padding: 5;">
                                <font-awesome-icon icon="trash"/>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!--non-Mobile device view-->
        <!-- Data table - only allow update/delete when authenticated user -->
        <div class="row align-items-center justify-content-center">
            <div class="col col-12 col-md-10 d-none d-xl-block d-lg-block d-md-block">
                <table class="table table-hover" style="overflow-y: auto"
                       :headers="headers">
                    <thead>
                    <tr>
                        <th scope="col">Title</th>
                        <th scope="col">Author</th>
                        <th scope="col">Image</th>
                        <th scope="col">Genre</th>
                        <th scope="col">Publication Date</th>
                        <th v-if="this.authenticated === 'true'" scope="col">Update</th>
                        <th v-if="this.authenticated === 'true'" scope="col">Delete</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="book in books" v-bind:key="book">
                        <th scope="row">{{ book.title }}</th>
                        <td>{{ book.author }}</td>
                        <td>
                        <div v-if="book.book_image" class="book-image">
                            <p><img :src="`${URL}${book.book_image}`" alt="Book Picture" class="img-thumbnail"/></p>
                        </div>
                        <div v-else class="book-image">
                            <img :src="require('@/assets/book_logo.jpg')" class="img-fluid" alt="Responsive image"/>
                        </div>
                        </td>

                        <td>{{ book.genre }}</td>
                        <td>{{ book.publication_date }}</td>

                        <td v-if="this.authenticated === 'true'" @click="updateBook(book)">
                            <button style="background-color: transparent; padding: 0;">
                                <font-awesome-icon icon="pencil"/>
                            </button>
                        </td>
                        <td v-if="this.authenticated === 'true'" @click="deleteBook(book)">
                            <button style="background-color: transparent; padding: 0;">
                                <font-awesome-icon icon="trash"/>
                            </button>
                        </td>
                    </tr>
                    </tbody>
                </table>
                <!-- Only allow add of book when authenticated user -->
                <div v-if="this.authenticated === 'true'">
                    <button type="button" class="btn btn-primary" @click="addNewBook">Add New Book</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {APIService} from "@/http/APIService";
    import { API_URL } from "../http/APIService";

    const apiService = new APIService();
    import router from "../router";

    export default {
        data() {
            return {
                books: {},
                URL: API_URL,
                validUserName: "Guest",
                bookSize: 0,
                showMsg: '',
                isMobile: false,
                authenticated: false,
                headers: [
                    {text: 'Name', sortable: false, align: 'left'},
                    {text: 'Description', sortable: false, align: 'left',},
                    {text: 'Image', sortable: false, align: 'left',},
                    {text: 'Year', sortable: false, align: 'left',},
                    {text: 'Rating', sortable: false, align: 'left',},
                    {text: 'Update', sortable: false, align: 'center',},
                    {text: 'Delete', sortable: false, align: 'center',},
                ],
            };
        },
        mounted() {
            this.authenticated = localStorage.getItem("isAuthenticated")
            this.getBooks();
        },
        methods: {
            onResize() {
                if (window.innerWidth > 600)
                    this.isMobile = true;
                else
                    this.isMobile = false;
            },
            showMessages() {
                if (this.$route.params.msg) {
                    this.showMsg = this.$route.params.msg;
                }
            },
            getBooks() {
                apiService
                    .getBookList()
                    .then((response) => {
                        this.books = response.data.data;
                        this.bookSize = this.books.length;
                        if (
                            localStorage.getItem("isAuthenticated") &&
                            JSON.parse(localStorage.getItem("isAuthenticated")) === true
                        ) {
                            this.validUserName = JSON.parse(localStorage.getItem("log_user"));
                        }
                    })
                    .catch((error) => {
                        localStorage.removeItem("isAuthenticated");
                        localStorage.setItem("isAuthenticated", false)
                        localStorage.removeItem("log_user");
                        localStorage.removeItem("access");
                        router.push("/auth");
                    });
            },
            addNewBook() {
                if (localStorage.getItem("isAuthenticated")
                    && JSON.parse(localStorage.getItem("isAuthenticated")) === true) {
                    router.push('/book-create');
                } else {
                    router.push("/auth");
                }
            },
            updateBook(book) {
                router.push("/book-create/" + book.pk);
            },
            deleteBook(book) {
                if (confirm("Do you really want to delete?")) {
                    apiService.deleteBook(book.pk).then(response => {
                        if (response.status === 204) {
                            router.push('/book-list/deleted/')
                            this.getBooks()
                        }
                    }).catch(error => {
                        if (error.response.status === 401) { // "not authorized"
                            router.push("/auth");
                        } else if (error.response.status === 400) { //"bad request"
                            this.showMsg = "error";
                        } else {
                            this.showMsg = "error";
                        }

                    });
                }
            }
        },
    };
</script>

<style>
    button {
        padding: 1rem;
        border: 0;
        cursor: pointer;
    }
  .book-image img {
    max-width: 100px;
    max-height: 100px;
    border-radius: 5px;
    margin-bottom: 10px;
    object-fit: cover;
  }
</style>
