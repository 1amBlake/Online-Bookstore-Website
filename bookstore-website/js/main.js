/*
Minh Huy
*/

// Hàm lắng nghe sự kiện (Dom Ready)
$(document).ready(function () {
    //Method kiểm tra trạng thái đang nhập
    checkLoginStatus();
    //Method nhận diện trang đang mở trên nav
    setActiveNavLink();
    //Method cập nhật số lượng sách trong icon giỏ hàng trên nav
    updateCartCount();
    //Method tìm kiếm dùng tại index với product
    handleSearchForm();
    //Method xử lý đăng ký
    handleRegisterForm();
    //Method xử lý đăng nhập
    handleLoginForm();
    //Method hiển thị tin tức mới nhất (index với news)
    renderLatestNewsIndex();
    //Method hiển thi tất cả tin tức trên trang tin tức
    renderAllNewsPage();
    //Method hiển thị chi tiết sách (trang chủ)
    renderFeaturedBooks();
    //Method hiển thị cho trang sách
    renderProductsPage();
    //Mehtod hiện thị cho trang chi tiết sách
    renderProductDetail();
    //Method khi thêm sách thì sẽ +1 vào giỏ
    handleAddToCart();
    //Method hiển thị trang giỏ hàng 
    renderCartPage();
    //Method hiển thị trang thanh toán
    renderCheckoutPage();
    //Method hiển thị trang đơn sách
    renderOrdersPage();
    //Method hiển thị trang chi tiết đơn sahcs 
    renderOrderDetailPage();
});

//Method kiểm tra trạng thái đăng nhập để cập nhật hóa đơn
function checkLoginStatus() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser')); //Xem có user đang đăng nhập không, không = giữ nguyên nav
    const navbarNav = document.querySelector('.navbar-nav');

    if (currentUser && navbarNav) {
        //Xóa nút Đăng nhập / Đăng ký cũ
        const loginLink = navbarNav.querySelector('a[href="login.html"]');
        if (loginLink) loginLink.parentElement.remove(); //Xóa nút đăng ký sđăng nhập

        const registerLink = navbarNav.querySelector('a[href="register.html"]');
        if (registerLink) registerLink.parentElement.remove();

        //Kiểm tra xem nút Đăng xuất đã tồn tại chưa
        if (!document.getElementById('btn-logout')) {
            //html cho nút đơn hàng
            const userHtml = `
                <li class="nav-item ms-lg-2">
                    <a class="nav-link fw-semibold" href="orders.html" style="color: var(--accent-color);">
                        📦 Đơn hàng
                    </a>
                </li>
                <li class="nav-item ms-lg-3 text-white d-flex align-items-center">
                    <span class="me-2">Chào, <strong>${currentUser.fullName}</strong></span>
                </li>
                <li class="nav-item ms-lg-2">
                    <button class="btn btn-outline-light btn-sm px-3" id="btn-logout">
                        Đăng xuất
                    </button>
                </li>
            `;

            //chèn đoạn html trên vào cuối nav
            navbarNav.insertAdjacentHTML('beforeend', userHtml);

            //xử lý cho đăng xuất
            document.getElementById('btn-logout').addEventListener('click', function () {
                if (confirm("Bạn có chắc chắn muốn đăng xuất không?")) {
                    localStorage.removeItem('currentUser');
                    alert("Đã đăng xuất thành công!");
                    window.location.href = 'index.html';
                }
            });
        }
    }
}

// Method dùng để hiển thị trang hiện đang ở trên nav
function setActiveNavLink() {
    const path = window.location.pathname; //Lấy url
    const currentPage = path.split("/").pop(); //Tách để lấy tên file

    const navLinks = document.querySelectorAll(".navbar .nav-link"); //Gom thẻ a vào Nodelist

    // Vòng lặp for truyền thống với biến đếm i
    for (let i = 0; i < navLinks.length; i++) {
        const link = navLinks[i]; // Lấy phần tử tại vị trí i
        const linkPage = link.getAttribute("href"); // Xem coi đang dẫn đến vị trí nào

        if (linkPage === currentPage) {
            link.classList.add("active"); //Tô đậm
        } else {
            link.classList.remove("active"); //Bỏ tô đậm nếu không còn ở trang đó
        }
    }
}

//Method cập nhật số lượng sách cho icon giỏ hàng trên nav
function updateCartCount() {
    //lấy dữ liệu từ LocalStorage, nếu không có thì mặc định là mảng rỗng
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    let totalQuantity = 0;

    //đi qua từng món hàng (item) có trong giỏ (cart)
    for (const item of cart) {
        //lấy số lượng của món đó cộng dồn vào "giỏ đựng"
        //nếu không có số lượng (undefined), lấy mặc định là 1
        totalQuantity += (item.quantity || 1);
    }

    //kết quả cuối cùng nằm ở biến totalQuantity
    //cập nhật lên giao diện
    const cartCountElement = document.getElementById("cart-count");
    if (cartCountElement) {
        cartCountElement.textContent = totalQuantity;
    }
}

//Method cho tìm kiếm
function handleSearchForm() {
    const searchForm = document.querySelector(".search-box");

    if (searchForm) {
        searchForm.addEventListener("submit", function (event) {
            //chặn trình duyệt load lại trang theo cách mặc định của form
            event.preventDefault();

            //tìm ô input bên trong form và lấy giá trị
            const inputKeyword = this.querySelector("input[name='keyword']");
            const keyword = inputKeyword ? inputKeyword.value.trim() : "";

            //Điều hướng trang
            if (keyword === "") {
                window.location.href = "products.html";
            } else {
                //mã hóa các ký tự đặc biệt (tiếng Việt, dấu cách)
                window.location.href = "products.html?keyword=" + encodeURIComponent(keyword);
            }
        });
    }
}

//method hiển thị tin tức ở index
function renderLatestNewsIndex() {
    //chọn vùng chứa (ID duy nhất -> Dùng JS thuần là nhanh nhất)
    const newsContainer = document.getElementById('latest-news-container');

    //kiểm tra an toàn: Nếu không có khung chứa hoặc chưa có mảng newsList thì thoát
    if (!newsContainer || typeof newsList === 'undefined') return;

    //xử lý dữ liệu (JS thuần)
    const latestNews = newsList.slice(0, 3);
    let html = '';

    latestNews.forEach(news => {
        html += `
            <div class="col-md-4 mb-4">
                <div class="card h-100 border-0 shadow-sm overflow-hidden news-card">
                    <img src="${news.image}" 
                         class="card-img-top" 
                         alt="${news.title}" 
                         style="height: 200px; object-fit: cover;">
                    <div class="card-body">
                        <small class="text-muted">${news.date}</small>
                        <h5 class="card-title fw-bold mt-2">${news.title}</h5>
                        <p class="card-text text-muted small">${news.summary.substring(0, 100)}...</p>
                        <a href="news.html" class="btn btn-outline-primary-custom btn-sm">Đọc tiếp</a>
                    </div>
                </div>
            </div>
        `;
    });

    // 4. Đổ dữ liệu vào giao diện (JS thuần)
    newsContainer.innerHTML = html;
}

//Hàm hiển thị danh sách toàn bộ tin tức tại trang news.html
function renderAllNewsPage() {
    //xác định vùng chứa danh sách tin tức
    //sử dụng getElementById vì đây là ID duy nhất, giúp trình duyệt tìm kiếm nhanh nhất (JS thuần)
    const container = document.getElementById('news-list');

    //nếu không tìm thấy vùng chứa hàm sẽ dừng ngay lập tức
    if (!container) return;

    //hởi tạo biến tích lũy mã HTML
    let html = "";

    //duyệt qua mảng dữ liệu tin tức (newsList lấy từ file data.js)
    newsList.forEach(news => {
        //sử dụng Template Literal (dấu `) để lắp ráp các mảnh dữ liệu vào bộ khung HTML
        html += `
            <div class="col-md-4 mb-4">
                <div class="card h-100 shadow-sm news-card">
                    <img src="${news.image}" class="card-img-top" alt="${news.title}" style="height: 200px; object-fit: cover;">
                    
                    <div class="card-body">
                        <h5 class="card-title fw-bold">${news.title}</h5>
                        <p class="text-muted small">${news.summary}</p>
                        
                        <button class="btn btn-primary btn-sm" onclick="showNewsDetail(${news.id})">
                            Xem chi tiết
                        </button>
                    </div>
                </div>
            </div>
        `;
    });

    //cập nhật giao diện
    //đổ toàn bộ chuỗi HTML đã tích lũy vào vùng chứa chỉ trong một lần duy nhất (Tối ưu hiệu suất DOM)
    container.innerHTML = html;
}

//Method hiển thị sách nổi bật trên trang chủ
function renderFeaturedBooks() {
    //chọn vùng chứa của tính năng
    const container = document.getElementById("featured-books");

    // Nếu trang này không có id="featured-books" (ví dụ trang Liên hệ) thì thoát hàm
    if (!container) {
        return;
    }
    //lấy dữ liệu và cắt lấy 4 cuốn đầu tiên
    const featuredBooks = getFeaturedBooks().slice(0, 4);
    let html = "";

    //duyệt mảng và tạo chuỗi HTML
    featuredBooks.forEach(function (book) {
        const category = getCategoryById(book.categoryId);
        const categoryName = category ? category.name : "Sách";

        html += `
            <div class="col-sm-6 col-lg-3 mb-4">
                <article class="card book-card h-100">
                    <img src="${book.image}" 
                         class="card-img-top" 
                         alt="Sách ${book.title}">

                    <div class="card-body d-flex flex-column">
                        <span class="badge bg-category align-self-start mb-2">
                            ${categoryName}
                        </span>

                        <h3 class="card-title h6 text-truncate">${book.title}</h3>

                        <p class="card-text text-muted small flex-grow-1">
                            ${book.description}
                        </p>

                        <div class="d-flex justify-content-between align-items-center mt-2">
                            <span class="book-price">${formatPrice(book.price)}</span>

                            <a href="product-detail.html?id=${book.id}" 
                               class="btn btn-sm btn-primary">
                                Chi tiết
                            </a>
                        </div>
                    </div>
                </article>
            </div>
        `;
    });

    //đổ toàn bộ chuỗi HTML vào vùng chứa
    container.innerHTML = html;
}

//method lấy dữ liệu động từ url
function getUrlParam(paramName) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(paramName);
}

//Số lượng tối đa sách hiển thị mỗi trang
const PRODUCTS_PER_PAGE = 9;

//Hiển thị xử lý việc hiển thị danh sách sản phẩm
function renderProductsPage() {
    //Kiểm tra sự tồn tại của vùng chứa danh sách sản phẩm
    const productList = $("#product-list");

    //không thấy id, trả về null
    if (productList.length === 0) {
        return;
    }

    //Thu thập các tham số lọc từ URL (getUrlParam)
    const keyword = getUrlParam("keyword") || ""; //từ khóa
    const category = getUrlParam("category") || ""; //thể loại (id)
    const price = getUrlParam("price") || ""; //giá
    const sort = getUrlParam("sort") || "default"; //sắp xếp
    const page = Number(getUrlParam("page")) || 1; //trang hiện tại

    //đổ dữ liệu lên input / select
    $("#filterKeyword").val(keyword);
    $("#filterCategory").val(category);
    $("#filterPrice").val(price);
    $("#sortProduct").val(sort);

    let filteredBooks = books.filter(function (book) {
        //lọc theo tiêu đề, tác giả, mô tả
        const matchKeyword =
            keyword === "" ||
            book.title.toLowerCase().includes(keyword.toLowerCase()) ||
            book.author.toLowerCase().includes(keyword.toLowerCase()) ||
            book.description.toLowerCase().includes(keyword.toLowerCase());

        //lọc theo thể loại
        const matchCategory =
            category === "" || book.categoryId === category;

        let matchPrice = true;

        //lọc theo khoản giá
        if (price === "duoi-100") {
            matchPrice = book.price < 100000;
        } else if (price === "100-150") {
            matchPrice = book.price >= 100000 && book.price <= 150000;
        } else if (price === "tren-150") {
            matchPrice = book.price > 150000;
        }

        //trả về sách thỏa điều kiện
        return matchKeyword && matchCategory && matchPrice;
    });

    //sắp xếp
    //tăng
    if (sort === "price-asc") {
        filteredBooks.sort(function (a, b) {
            return a.price - b.price;
        });
    }
    //giảm
    else if (sort === "price-desc") {
        filteredBooks.sort(function (a, b) {
            return b.price - a.price;
        });
    }// a-z theo tiến gvieetj
    else if (sort === "name-asc") {
        filteredBooks.sort(function (a, b) {
            return a.title.localeCompare(b.title, "vi");
        });
    }

    //tính tổng theo theo số sách lọc được
    const totalPages = Math.ceil(filteredBooks.length / PRODUCTS_PER_PAGE);
    //trang phải hợp leek, tức min 1
    const validPage = Math.min(Math.max(page, 1), totalPages || 1);
    //var này lấy index để cắt mảng
    const startIndex = (validPage - 1) * PRODUCTS_PER_PAGE;
    //cắt sao cho max 9 sách 1 trang
    const booksOnPage = filteredBooks.slice(
        startIndex,
        startIndex + PRODUCTS_PER_PAGE
    );

    //hiển thị lên web
    renderBookList(booksOnPage);
    renderProductPagination(totalPages, validPage);
    handleProductFilterForm();
    handleProductSort();
}

//hiển thị danh sách sách đã được lọc và phân trang
function renderBookList(bookArray) {
    //vùng chứa danh sách sách trên web
    const productList = $("#product-list");

    //Xử lý trường hợp không tìm thấy kết quả (Mảng rỗng)
    if (bookArray.length === 0) {
        productList.html(`
            <div class="col-12">
                <div class="feature-box text-center">
                    <h3 class="h5">Không tìm thấy sách phù hợp</h3>
                    <p class="text-muted mb-0">
                        Bạn hãy thử từ khóa hoặc bộ lọc khác.
                    </p>
                </div>
            </div>
        `);
        return;
    }

    //Khởi tạo biến tích lũy chuỗi HTML
    let html = "";

    //Duyệt qua từng cuốn sách trong mảng truyền vào
    bookArray.forEach(function (book) {
        //Lấy tên thể loại dựa trên ID (gọi hàm từ data.js)
        const category = getCategoryById(book.categoryId);
        const categoryName = category ? category.name : "Sách";
        //Lắp ráp Template Literal (dấu `) để tạo khung Card cho từng cuốn sách
        html += `
            <div class="col-sm-6 col-xl-4">
                <article class="card book-card h-100">
                    <img src="${book.image}" 
                         class="card-img-top" 
                         alt="Sách ${book.title}">

                    <div class="card-body d-flex flex-column">
                        <span class="badge bg-category align-self-start mb-2">
                            ${categoryName}
                        </span>

                        <h3 class="card-title h6">${book.title}</h3>

                        <p class="small text-muted mb-1">
                            ${book.author}
                        </p>

                        <p class="card-text text-muted small flex-grow-1">
                            ${book.description}
                        </p>

                        <div class="d-flex justify-content-between align-items-center mt-2">
                            <span class="book-price">
                                ${formatPrice(book.price)}
                            </span>

                            <a href="product-detail.html?id=${book.id}" 
                               class="btn btn-sm btn-primary">
                                Chi tiết
                            </a>
                        </div>
                    </div>
                </article>
            </div>
        `;
    });
    //Đổ toàn bộ chuỗi HTML đã xây dựng vào vùng chứa (Cập nhật giao diện một lần duy nhất)
    productList.html(html);
}

//hiển thị phân trang (số lượng trang ở trang product)
function renderProductPagination(totalPages, currentPage) {
    //Xác định vùng chứa thanh phân trang trên giao diện
    const pagination = $("#product-pagination");

    //Nếu không tìm thấy vùng chứa trên trang hiện tại thì thoát
    if (pagination.length === 0) {
        return;
    }

    //Nếu tổng số trang chỉ có 1 (hoặc 0), thì ẩn thanh phân trang đi
    if (totalPages <= 1) {
        pagination.html("");
        return;
    }

    let html = "";

    //Tạo nút "TRƯỚC" (Previous)
    html += `
        <li class="page-item ${currentPage === 1 ? "disabled" : ""}">
            <a class="page-link" href="${buildProductUrl(currentPage - 1)}">
                Trước
            </a>
        </li>
    `;

    //Vòng lặp tạo các nút số trang (1, 2, 3...)
    for (let i = 1; i <= totalPages; i++) {
        //Nút trang hiện tại sẽ có class 'active' để tô đậm màu xanh
        html += `
            <li class="page-item ${i === currentPage ? "active" : ""}">
                <a class="page-link" href="${buildProductUrl(i)}">
                    ${i}
                </a>
            </li>
        `;
    }

    //Tạo nút "SAU" (Next)
    //Template Literals
    html += `
        <li class="page-item ${currentPage === totalPages ? "disabled" : ""}">
            <a class="page-link" href="${buildProductUrl(currentPage + 1)}">
                Sau
            </a>
        </li>
    `;

    //Cập nhật toàn bộ thanh phân trang vào HTML
    pagination.html(html);
}

//method dựng đường dẫn URL mới cho trang sản phẩm khi chuyển trang (Phân trang)
function buildProductUrl(page) {
    /*
    Khởi tạo đối tượng URLSearchParams từ URL hiện tại của trình duyệt
    window.location.search lấy phần đuôi từ dấu "?" trở đi (?keyword=abc&category=1)
    */
    const params = new URLSearchParams(window.location.search);

    //Cập nhật hoặc thêm mới tham số "page" vào danh sách tham số
    params.set("page", page);

    //biến đối tượng thành chuỗi "keyword=abc&category=1&page=2"
    return "products.html?" + params.toString();
}

//method xử lý sự kiện khi người dùng nhấn nút "Lọc" hoặc "Tìm kiếm" trong form bộ lọc.
function handleProductFilterForm() {
    //Lắng nghe sự kiện Submit (gửi biểu mẫu) của form bộ lọc
    $("#product-filter-form").on("submit", function (event) {
        //Chặn hành động load lại trang mặc định của trình duyệt
        event.preventDefault();
        //Lấy giá trị từ các ô Input và Select
        const keyword = $("#filterKeyword").val().trim();
        const category = $("#filterCategory").val();
        const price = $("#filterPrice").val();
        //Khởi tạo đối tượng quản lý tham số URL vd "?keyword=abc&price=..."
        const params = new URLSearchParams();
        //Kiểm tra và đóng gói dữ liệu vào danh sách tham số
        if (keyword !== "") {
            params.set("keyword", keyword);
        }

        if (category !== "") {
            params.set("category", category);
        }

        if (price !== "") {
            params.set("price", price);
        }
        //Luôn đặt lại số trang về 1 mỗi khi thực hiện bộ lọc mới
        params.set("page", 1);
        //Thực hiện điều hướng trình duyệt sang trang danh sách sản phẩm
        //vd products.html?keyword=...&category=...&page=1
        window.location.href = "products.html?" + params.toString();
    });
}

//method xử lý sự kiện khi người dùng thay đổi lựa chọn trong ô "Sắp xếp theo"
function handleProductSort() {
    //Lắng nghe sự kiện của thẻ select có id="sortProduct"
    $("#sortProduct").on("change", function () {
        //Khởi tạo đối tượng URLSearchParams từ URL hiện tại của trình duyệt
        const params = new URLSearchParams(window.location.search);
        //Lấy giá trị sắp xếp mà người dùng vừa chọn
        const sort = $(this).val();
        //Logic cập nhật tham số "sort"
        if (sort === "default") {
            //chọn "Mặc định", xóa bỏ tham số sort khỏi URL
            params.delete("sort");
        } else {
            params.set("sort", sort);
        }

        params.set("page", 1);
        //Thực hiện điều hướng trình duyệt sang URL mới đã được cập nhật tham số
        window.location.href = "products.html?" + params.toString();
    });
}

//method hiển thị thông tin chi tiết của một cuốn sách
function renderProductDetail() {
    if ($("#detail-book-title").length === 0) {
        return;
    }
    // /Lấy ID sách từ tham số "id" trên URL, nếu không có mặc định lấy sách số 1
    const id = getUrlParam("id") || 1;
    //Tìm đối tượng sách tương ứng trong mảng books data.js
    const book = getBookById(id);

    //Xử lý trường hợp không tìm thấy sách (ID sai hoặc sách đã bị xóa)
    if (!book) {
        $("main").html(`
            <section class="py-5">
                <div class="container">
                    <div class="feature-box text-center">
                        <h1 class="h3">Không tìm thấy sách</h1>
                        <p class="text-muted">
                            Sách bạn đang xem không tồn tại hoặc đã bị xóa.
                        </p>
                        <a href="products.html" class="btn btn-primary">
                            Quay lại danh sách sách
                        </a>
                    </div>
                </div>
            </section>
        `);
        return;
    }

    const category = getCategoryById(book.categoryId);
    const categoryName = category ? category.name : "Sách";
    const discount = Math.round((1 - book.price / book.oldPrice) * 100);
    //Cập nhật ảnh sản phẩm và thuộc tính alt
    $("#detail-book-image").attr("src", book.image);
    $("#detail-book-image").attr("alt", "Sách " + book.title);
    //Cập nhật các thông tin văn bản cơ bản
    $("#detail-book-category").text(categoryName);
    $("#detail-book-title").text(book.title);
    $("#detail-book-author").text(book.author);
    $("#detail-book-rating").text("★★★★★ " + book.rating);
    //Tạo mã sách tự động (Ví dụ: HDTTT-000)
    $("#detail-book-code").text("HDTTT-" + String(book.id).padStart(3, "0"));
    //Hiển thị trạng thái kho hàng và giá tiền
    $("#detail-book-stock").text(book.stock > 0 ? "Còn hàng" : "Hết hàng");
    $("#detail-book-price").text(formatPrice(book.price));
    $("#detail-book-old-price").text(formatPrice(book.oldPrice));
    //Đổ nội dung mô tả
    $("#detail-book-description").text(book.description);
    $("#detail-book-long-description").text(book.longDescription || book.description);
    $("#detail-book-publisher").text(book.publisher);
    $("#detail-book-year").text(book.year);
    $("#detail-book-pages").text(book.pages + " trang");
    $("#detail-book-quantity-stock").text(book.stock + " quyển");
    //Thiết lập các ràng buộc cho người dùng
    //Giới hạn số lượng mua tối đa không vượt quá số lượng tồn kho
    $("#quantity").attr("max", book.stock);
    // Hiển thị nhãn giảm giá
    $("#detail-discount").text("Tiết kiệm " + discount + "%");

    renderRelatedBooks(book);
}

//thị danh sách các sản phẩm liên quan (Cùng thể loại)
function renderRelatedBooks(currentBook) {
    const container = $("#related-books");

    if (container.length === 0) {
        return;
    }
    //lọc dữ liệu
    const relatedBooks = books
        .filter(function (book) {
            //Lọc ra các cuốn sách có cùng ID thể loại (categoryId) phải khác ID với cuốn đang xem
            return book.categoryId === currentBook.categoryId &&
                book.id !== currentBook.id;
        })
        .slice(0, 4);//Chỉ lấy tối đa 4 cuốn sách để đảm bảo giao diện cân đối

    let html = "";

    //Duyệt qua mảng sách liên quan đã lọc được
    relatedBooks.forEach(function (book) {
        const category = getCategoryById(book.categoryId);
        const categoryName = category ? category.name : "Sách";
        //Lắp ráp Template Literal để tạo khung Card cho từng cuốn sách gợi ý
        html += `
            <div class="col-sm-6 col-lg-3">
                <article class="card book-card h-100">
                    <img src="${book.image}" 
                        class="card-img-top" 
                        alt="Sách ${book.title}">

                    <div class="card-body d-flex flex-column">
                        <span class="badge bg-category align-self-start mb-2">
                            ${categoryName}
                        </span>

                        <h3 class="card-title h6">${book.title}</h3>

                        <p class="text-muted small flex-grow-1">
                            ${book.author}
                        </p>

                        <div class="d-flex justify-content-between align-items-center">
                            <span class="book-price">
                                ${formatPrice(book.price)}
                            </span>

                            <a href="product-detail.html?id=${book.id}" 
                            class="btn btn-sm btn-primary">
                                Chi tiết
                            </a>
                        </div>
                    </div>
                </article>
            </div>
        `;
    });

    container.html(html);
}

//method xử lý sự kiện khi người dùng nhấn nút "Thêm vào giỏ hàng"
function handleAddToCart() {
    //Lắng nghe sự kiện click trên nút "Thêm vào giỏ hàng"
    $("#btn-add-cart").on("click", function () {
        //Xác định cuốn sách hiện tại dựa trên ID lấy từ thanh địa chỉ URL
        const id = Number(getUrlParam("id") || 1);
        const book = getBookById(id);

        if (!book) {
            alert("Không tìm thấy sách để thêm vào giỏ hàng.");
            return;
        }
        //Lấy số lượng từ ô nhập liệu và chuyển sang kiểu số (Number)
        const quantity = Number($("#quantity").val());
        //Số lượng mua phải tối thiểu là 1
        if (quantity < 1) {
            alert("Số lượng phải lớn hơn 0.");
            return;
        }
        //Kiểm tra tồn kho
        if (quantity > book.stock) {
            alert("Số lượng vượt quá số sách còn trong kho.");
            return;
        }

        addToCart(book.id, quantity);
        //làm mới con số trên icon giỏ hàng tại Navbar
        updateCartCount();

        alert("Đã thêm sách vào giỏ hàng!");
    });
}

//thêm sản phẩm vào giỏ hàng và lưu trữ vào LocalStorage
function addToCart(bookId, quantity) {
    // Lấy chuỗi giỏ hàng từ LocalStorage và giải mã JSON thành mảng.
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    //lấy chuỗi giỏ hàng từ LocalStorage và giải mã JSON thành mảng.
    const existingItem = cart.find(function (item) {
        return item.id === bookId;
    });

    if (existingItem) {
        //Sách đã có trong giỏ -> Chỉ cần cập nhật thêm số lượng mới vào số lượng cũ.
        existingItem.quantity += quantity;
    } else { //Sách mới chưa có trong giỏ -> Thêm một đối tượng mới vào mảng.
        cart.push({
            id: bookId,
            quantity: quantity
        });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
}

//method xử lý logic Đăng ký thành viên
function handleRegisterForm() {
    //Tìm form đăng ký (Ưu tiên ID, sau đó là thuộc tính action)
    const registerForm = $('#register-form').length > 0 ? $('#register-form') : $('form[action="login.html"]');

    if (registerForm.length === 0) return;

    registerForm.on('submit', function (e) {
        e.preventDefault();

        //lấy dữ liệu
        const fullName = $('#registerName').val().trim();
        const email = $('#registerEmail').val().trim();
        const password = $('#registerPassword').val();
        const confirmPassword = $('#registerConfirmPassword').val();
        const termsAccepted = $('#termsCheck').is(':checked');

        // Regex Họ tên: [Chữ cái Hoa][Chữ cái thường]* ... cách nhau đúng 1 khoảng trắng
        // \p{Lu}: Chữ hoa Unicode | \p{Ll}: Chữ thường Unicode |'u':Unicode
        const nameRegex = /^[\p{Lu}][\p{Ll}]*(\s[\p{Lu}][\p{Ll}]*)*$/u;

        // Regex Email: Bắt đầu bằng chữ cái [a-zA-Z], không cho phép số đứng đầu
        const emailRegex = /^[a-zA-Z][a-zA-Z0-9._%+-]*@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        // Kiểm tra Tên
        if (!nameRegex.test(fullName)) {
            alert("Họ tên không hợp lệ! Vui lòng viết hoa chữ cái đầu mỗi từ và không dùng ký tự lạ.");
            return;
        }

        // Kiểm tra Email
        if (!emailRegex.test(email)) {
            alert("Email không hợp lệ! Email phải bắt đầu bằng chữ cái (vd: huy@gmail.com).");
            return;
        }

        // Kiểm tra Mật khẩu
        if (password.length < 6) {
            alert("Mật khẩu phải từ 6 ký tự trở lên!");
            return;
        }

        if (password !== confirmPassword) {
            alert("Mật khẩu xác nhận không khớp!");
            return;
        }

        // Kiểm tra Điều khoản
        if (!termsAccepted) {
            alert("Bạn phải đồng ý với điều khoản dịch vụ để đăng ký.");
            return;
        }

        // --- KIỂM TRA TRÙNG LẶP & LƯU DỮ LIỆU ---
        const localUsers = JSON.parse(localStorage.getItem('localUsers')) || [];
        const allUsers = [...users, ...localUsers]; // users lấy từ file data.js

        if (allUsers.some(user => user.email === email)) {
            alert("Email này đã được sử dụng. Vui lòng chọn email khác!");
            return;
        }

        // Tạo user mới và lưu vào LocalStorage
        const newUser = {
            id: Date.now(),
            fullName: fullName,
            email: email,
            password: password,
            role: "user"
        };

        localUsers.push(newUser);
        localStorage.setItem('localUsers', JSON.stringify(localUsers));

        alert("Đăng ký thành công! Hệ thống sẽ chuyển bạn sang trang đăng nhập.");
        window.location.href = 'login.html';
    });
}


//method xử lý logic Đăng nhập người dùng 
function handleLoginForm() {
    const loginForm = $('form[action="index.html"]');

    //Nếu trang hiện tại không có form đăng nhập thì thoát hàm
    if (loginForm.length === 0) return;


    //Khi trang load, kiểm tra xem có email nào được lưu ở LocalStorage không
    const savedEmail = localStorage.getItem('rememberedEmail');
    if (savedEmail) {
        $('#loginEmail').val(savedEmail);
        $('#rememberMe').prop('checked', true);
    }

    //Lắng nghe sự kiện Submit form
    loginForm.on('submit', function (e) {
        e.preventDefault(); // Chặn trình duyệt load lại trang

        //lasya dữ liệu từ giao diện
        const email = $('#loginEmail').val().trim();
        const password = $('#loginPassword').val();
        const rememberMe = $('#rememberMe').is(':checked');

        // Lấy danh sách từ LocalStorage (người dùng tự đăng ký)
        const localUsers = JSON.parse(localStorage.getItem('localUsers')) || [];
        // Gộp với danh sách users mẫu (từ file data.js)
        const allUsers = [...users, ...localUsers];

        // Tìm người dùng có Email và Mật khẩu khớp hoàn toàn
        const userFound = allUsers.find(u => u.email === email && u.password === password);

        if (userFound) {
            //Lưu thông tin người dùng hiện tại để các trang khác có thể sử dụng
            localStorage.setItem('currentUser', JSON.stringify({
                fullName: userFound.fullName,
                email: userFound.email,
                role: userFound.role
            }));

            //Xử lý logic "Ghi nhớ tài khoản"
            if (rememberMe) {
                localStorage.setItem('rememberedEmail', email);
            } else {
                localStorage.removeItem('rememberedEmail');
            }

            //Thông báo và điều hướng về trang chủ
            alert("Chào mừng " + userFound.fullName + " quay trở lại!");
            window.location.href = 'index.html';
        } else {
            alert("Email hoặc mật khẩu không chính xác. Vui lòng thử lại!");
        }
    });
}

//method xử lý giỏ hnagf
function renderCartPage() {
    // Chỉ chạy logic này nếu đang ở trang cart.html
    const tbody = $('#cart-items-body');
    if (tbody.length === 0) return;

    // Lấy giỏ hàng từ LocalStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Nếu giỏ hàng trống
    if (cart.length === 0) {
        $('#cart-has-items').hide();
        $('#cart-empty').show();
        return;
    }

    // Nếu có sản phẩm
    $('#cart-empty').hide();
    $('#cart-has-items').show();
    tbody.empty(); // Xóa dữ liệu cũ

    let subtotal = 0;

    // Duyệt qua từng sản phẩm trong mảng cart
    cart.forEach(function (item) {
        // DÙNG HÀM TỪ data.js ĐỂ LẤY THÔNG TIN SÁCH DỰA VÀO ID
        let book = getBookById(item.id);

        // Nếu không tìm thấy sách (có thể do lỗi data), bỏ qua
        if (!book) return;

        let itemTotal = book.price * item.quantity;
        subtotal += itemTotal;

        // Render HTML cho từng dòng
        let tr = `
            <tr>
                <td class="text-center">
                    <img src="${book.image}" alt="${book.title}" class="img-fluid rounded shadow-sm" style="width: 60px; height: 85px; object-fit: cover;">
                </td>
                <td>
                    <h3 class="h6 fw-bold mb-1">
                        <a href="product-detail.html?id=${book.id}" class="text-dark text-decoration-none">${book.title}</a>
                    </h3>
                    <p class="small text-muted mb-0">Mã: HDTTT-${String(book.id).padStart(3, '0')}</p>
                </td>
                <td class="text-center" style="width: 120px;">
                    <input type="number" class="form-control form-control-sm text-center cart-qty-update" 
                           value="${item.quantity}" min="1" max="${book.stock}" data-id="${book.id}">
                </td>
                <td class="text-end text-muted">${formatPrice(book.price)}</td>
                <td class="text-end fw-bold text-primary-custom">${formatPrice(itemTotal)}</td>
                <td class="text-center">
                    <button class="btn btn-sm btn-outline-danger btn-remove-item" data-id="${book.id}" title="Xóa">
                        &times;
                    </button>
                </td>
            </tr>
        `;
        tbody.append(tr);
    });

    // Xử lý phí vận chuyển và tổng tiền
    let shippingFee = subtotal >= 300000 ? 0 : 30000; // Freeship cho đơn từ 300k
    let grandTotal = subtotal + shippingFee;

    // Cập nhật DOM
    $('#subtotal').text(formatPrice(subtotal));
    $('#shipping-fee').text(shippingFee === 0 ? "Miễn phí" : formatPrice(shippingFee));
    $('#grand-total').text(formatPrice(grandTotal));
}

$(document).ready(function () {

    //Lắng nghe sự kiện THAY ĐỔI SỐ LƯỢNG
    $(document).on('change', '.cart-qty-update', function () {
        let bookId = $(this).data('id');
        let newQty = parseInt($(this).val());
        let maxStock = parseInt($(this).attr('max'));

        if (newQty < 1) newQty = 1;
        if (newQty > maxStock) {
            alert("Số lượng vượt quá số sách còn trong kho!");
            newQty = maxStock;
            $(this).val(newQty);
        }

        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        // Tìm và cập nhật số lượng
        let itemIndex = cart.findIndex(item => item.id === bookId);
        if (itemIndex > -1) {
            cart[itemIndex].quantity = newQty;
            localStorage.setItem('cart', JSON.stringify(cart));

            renderCartPage(); // Render lại bảng
            updateCartCount(); // Cập nhật số lượng trên navbar
        }
    });

    //Lắng nghe sự kiện XÓA 1 SẢN PHẨM
    $(document).on('click', '.btn-remove-item', function () {
        if (confirm("Bạn có chắc chắn muốn xóa sách này khỏi giỏ hàng?")) {
            let bookId = $(this).data('id');
            let cart = JSON.parse(localStorage.getItem('cart')) || [];

            // Lọc bỏ sản phẩm có id tương ứng
            cart = cart.filter(item => item.id !== bookId);
            localStorage.setItem('cart', JSON.stringify(cart));

            renderCartPage();
            updateCartCount();
        }
    });

    //Lắng nghe sự kiện XÓA TẤT CẢ
    $('#btn-clear-cart').on('click', function () {
        if (confirm("Bạn có chắc chắn muốn xóa toàn bộ giỏ hàng?")) {
            localStorage.removeItem('cart');
            renderCartPage();
            updateCartCount();
        }
    });
});

//method xử lý trang thanh toán
function renderCheckoutPage() {
    //Kiểm tra xem có đang ở trang checkout không (dựa vào ID #checkout-items)
    const checkoutContainer = $('#checkout-items');
    if (checkoutContainer.length === 0) return;

    //Lấy giỏ hàng từ LocalStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Nếu giỏ trống, báo lỗi và đẩy về trang sách
    if (cart.length === 0) {
        alert("Giỏ hàng của bạn đang trống! Vui lòng chọn sách trước khi thanh toán.");
        window.location.href = "products.html";
        return;
    }

    let subtotal = 0;
    checkoutContainer.empty(); // Xóa nội dung cũ

    //Render danh sách sản phẩm trong đơn hàng
    cart.forEach(function (item) {
        // Dùng hàm từ data.js để lấy chi tiết sách
        let book = getBookById(item.id);
        if (!book) return;

        let itemTotal = book.price * item.quantity;
        subtotal += itemTotal;

        // Tạo giao diện cho từng dòng sản phẩm
        let html = `
            <div class="d-flex align-items-center justify-content-between mb-3">
                <div class="d-flex align-items-center gap-3">
                    <div class="position-relative">
                        <img src="${book.image}" alt="${book.title}" class="rounded shadow-sm" style="width: 50px; height: 70px; object-fit: cover;">
                        <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-secondary border border-light">
                            ${item.quantity}
                        </span>
                    </div>
                    <div>
                        <h3 class="h6 mb-0 text-dark fw-bold" style="font-size: 0.9rem;">${book.title}</h3>
                        <small class="text-muted">HDTTT-${String(book.id).padStart(3, '0')}</small>
                    </div>
                </div>
                <span class="fw-semibold" style="font-size: 0.95rem;">${formatPrice(itemTotal)}</span>
            </div>
        `;
        checkoutContainer.append(html);
    });

    //Hàm tính toán và hiển thị các loại phí
    function updateCheckoutTotals() {
        // Đọc xem người dùng chọn loại ship nào
        let shippingMethod = $('input[name="shipping"]:checked').val();
        let shippingFee = 0;

        if (shippingMethod === 'standard') {
            // Đơn từ 300k miễn phí ship tiêu chuẩn
            shippingFee = subtotal >= 300000 ? 0 : 20000;
        } else if (shippingMethod === 'fast') {
            shippingFee = 40000;
        }

        let grandTotal = subtotal + shippingFee;

        // Cập nhật lên HTML
        $('#checkout-subtotal').text(formatPrice(subtotal));

        if (shippingFee === 0) {
            $('#checkout-shipping').html('<span class="text-success fw-bold">Miễn phí</span>');
        } else {
            $('#checkout-shipping').text(formatPrice(shippingFee));
        }

        $('#checkout-total').text(formatPrice(grandTotal));
    }

    // Gọi lần đầu để tính toán ngay khi load trang
    updateCheckoutTotals();

    // Lắng nghe sự kiện thay đổi phương thức giao hàng
    $('input[name="shipping"]').on('change', function () {
        updateCheckoutTotals();
    });

    // Xử lý sự kiện khi nhấn nút "Đặt hàng"
    $('#btn-place-order').on('click', function () {
        // 1. Thu thập dữ liệu từ các ô input
        const fullName = $('#full-name').val().trim();
        const phone = $('#phone').val().trim();
        const email = $('#email').val().trim();
        const address = $('#address').val().trim();   // Số nhà, tên đường
        const province = $('#province').val();        // Tỉnh/Thành
        const district = $('#district').val().trim(); // Quận/Huyện
        const ward = $('#ward').val().trim();         // Phường/Xã (Cần thêm ID này vào HTML nếu chưa có)

        // 2. ĐỊNH NGHĨA CÁC BỘ LỌC REGEX CHẶT CHẼ

        // Tên: Viết hoa đầu từ, không số, không ký tự lạ, không 2 khoảng trắng
        const nameRegex = /^[\p{Lu}][\p{Ll}]*(\s[\p{Lu}][\p{Ll}]*)*$/u;

        // SĐT Việt Nam: Bắt đầu bằng 03, 05, 07, 08, 09 và đủ 10 số
        const phoneRegex = /^(03|05|07|08|09)\d{8}$/;

        // Email: Bắt đầu bằng chữ cái, đúng định dạng chuẩn
        const emailRegex = /^[a-zA-Z][a-zA-Z0-9._%+-]*@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        // Địa chỉ (Số nhà/Đường): Chấp nhận chữ, số, dấu xẹt (/), dấu gạch ngang (-)
        const addressRegex = /^[\p{L}0-9\s/,. -]+$/u;

        // Danh sách Quận/Huyện TPHCM (Để kiểm tra nếu province là TPHCM)
        const tphcmDistricts = /^(Quận (1|2|3|4|5|6|7|8|9|10|11|12)|Bình Thạnh|Gò Vấp|Phú Nhuận|Tân Bình|Tân Phú|Bình Tân|Thủ Đức|Củ Chi|Hóc Môn|Bình Chánh|Nhà Bè|Cần Giờ)$/i;

        //KIỂM TRA DỮ LIỆU (VALIDATION)

        if (!nameRegex.test(fullName)) {
            alert("Họ tên không hợp lệ! Vui lòng viết hoa chữ cái đầu (VD: Nguyễn Văn A).");
            return;
        }

        if (!phoneRegex.test(phone)) {
            alert("Số điện thoại không hợp lệ! Phải là số Việt Nam (10 chữ số).");
            return;
        }

        if (!emailRegex.test(email)) {
            alert("Email không hợp lệ! (VD: huy@gmail.com).");
            return;
        }

        if (!addressRegex.test(address) || address.length < 5) {
            alert("Địa chỉ số nhà/đường không hợp lệ hoặc quá ngắn!");
            return;
        }

        if (province === "Thành phố Hồ Chí Minh" && !tphcmDistricts.test(district)) {
            alert("Tên Quận/Huyện tại TPHCM không chính xác!");
            return;
        }

        if (!ward || ward.length < 2) {
            alert("Vui lòng nhập tên Phường/Xã hợp lệ!");
            return;
        }

        //NẾU MỌI THỨ HỢP LỆ -> TIẾN HÀNH TẠO ĐƠN HÀNG
        const orderId = "DH-" + Math.floor(100000 + Math.random() * 900000);
        const paymentMethod = $('input[name="payment"]:checked').next('label').text().trim().split('\n')[0];

        const newOrder = {
            id: orderId,
            date: new Date().toLocaleDateString('vi-VN'),
            customerName: fullName,
            phone: phone,
            // Gộp địa chỉ đầy đủ theo mẫu Việt Nam
            address: `${address}, ${ward}, ${district}, ${province}`,
            items: cart,
            total: parseInt($('#checkout-total').text().replace(/\D/g, '')),
            status: orderStatus.pending,
            payment: paymentMethod
        };

        //LƯU TRỮ VÀ CHUYỂN TRANG
        let orders = JSON.parse(localStorage.getItem('orders')) || [];
        orders.unshift(newOrder);
        localStorage.setItem('orders', JSON.stringify(orders));

        localStorage.removeItem('cart'); // Xóa giỏ hàng

        alert(`🎉 Đặt hàng thành công!\nMã đơn hàng: ${orderId}`);
        window.location.href = 'index.html';
    });
}

//method xử lý quản lý trang háo đơn
function renderOrdersPage() {
    const ordersTable = $('#orders-table');
    if (ordersTable.length === 0) return; // Chỉ chạy nếu đang ở trang orders.html

    // Cấu hình phân trang
    const ORDERS_PER_PAGE = 5;
    let currentPage = 1;
    let currentFilter = 'all';
    let searchKeyword = '';

    // Hàm render bảng đơn hàng
    function renderTable() {
        // 1. Lấy dữ liệu từ LocalStorage
        let orders = JSON.parse(localStorage.getItem('orders')) || [];

        // 2. Lọc theo từ khóa tìm kiếm (Mã đơn hàng)
        if (searchKeyword !== '') {
            orders = orders.filter(order => order.id.toLowerCase().includes(searchKeyword));
        }

        // 3. Lọc theo trạng thái
        // Mapping data-status html với text trạng thái trong orderStatus (data.js)
        const statusMap = {
            'pending': orderStatus.pending,       // "Chờ xử lý"
            'shipping': orderStatus.processing,   // "Đang xử lý/Đang giao" (Tùy data.js)
            'done': orderStatus.completed,        // "Hoàn thành"
            'cancel': orderStatus.cancelled       // "Đã hủy"
        };

        if (currentFilter !== 'all') {
            let statusText = statusMap[currentFilter];
            orders = orders.filter(order => order.status === statusText);
        }

        // 4. Phân trang
        const totalPages = Math.ceil(orders.length / ORDERS_PER_PAGE);
        // Đảm bảo currentPage không vượt quá tổng số trang
        if (currentPage > totalPages && totalPages > 0) currentPage = totalPages;

        const startIndex = (currentPage - 1) * ORDERS_PER_PAGE;
        const ordersOnPage = orders.slice(startIndex, startIndex + ORDERS_PER_PAGE);

        // 5. Hiển thị dữ liệu
        ordersTable.empty();

        if (orders.length === 0) {
            ordersTable.html(`
                <tr>
                    <td colspan="6" class="text-center py-4 text-muted">
                        Không tìm thấy đơn hàng nào phù hợp.
                    </td>
                </tr>
            `);
        } else {
            ordersOnPage.forEach(order => {
                // Xác định màu badge (nhãn) dựa trên trạng thái
                let badgeClass = 'bg-secondary';
                if (order.status === orderStatus.pending) badgeClass = 'bg-warning text-dark';
                else if (order.status === orderStatus.completed) badgeClass = 'bg-success';
                else if (order.status === orderStatus.cancelled) badgeClass = 'bg-danger';
                else badgeClass = 'bg-info text-dark';

                let tr = `
            <tr>
                <td class="order-id-text">${order.id}</td>
                <td class="fw-semibold">${order.customerName}</td>
                <td>${order.date}</td>
                <td class="fw-bold text-primary-custom">${formatPrice(order.total)}</td>
                <td><span class="badge ${badgeClass}">${order.status}</span></td>
                <td class="text-center">
                    <a href="order-detail.html?id=${order.id}" class="btn btn-sm btn-outline-primary">
                        Chi tiết
                    </a>
                </td>
            </tr>
        `;
                ordersTable.append(tr);
            });
        }

        // 6. Hiển thị thanh phân trang
        renderPagination(totalPages);
    }

    // Hàm render các nút phân trang
    function renderPagination(totalPages) {
        const pagination = $('#pagination');
        pagination.empty();

        if (totalPages <= 1) return;

        // Nút "Trước"
        pagination.append(`
            <li class="page-item ${currentPage === 1 ? 'disabled' : ''}">
                <a class="page-link" href="#" data-page="${currentPage - 1}">Trước</a>
            </li>
        `);

        // Các số trang
        for (let i = 1; i <= totalPages; i++) {
            pagination.append(`
                <li class="page-item ${i === currentPage ? 'active' : ''}">
                    <a class="page-link" href="#" data-page="${i}">${i}</a>
                </li>
            `);
        }

        // Nút "Sau"
        pagination.append(`
            <li class="page-item ${currentPage === totalPages ? 'disabled' : ''}">
                <a class="page-link" href="#" data-page="${currentPage + 1}">Sau</a>
            </li>
        `);
    }

    // Lắng nghe sự kiện click phân trang
    $('#pagination').on('click', '.page-link', function (e) {
        e.preventDefault();
        let selectedPage = $(this).data('page');
        if (selectedPage) {
            currentPage = selectedPage;
            renderTable();
        }
    });

    // Lắng nghe sự kiện Tìm kiếm theo mã đơn
    $('#search-input').on('keyup', function () {
        searchKeyword = $(this).val().trim().toLowerCase();
        currentPage = 1; // Reset về trang 1 khi tìm kiếm
        renderTable();
    });

    // Lắng nghe sự kiện click Bộ lọc trạng thái
    $('#filter-buttons button').on('click', function () {
        // Đổi màu nút đang active
        $('#filter-buttons button').removeClass('active');
        $(this).addClass('active');

        currentFilter = $(this).data('status');
        currentPage = 1; // Reset về trang 1 khi lọc
        renderTable();
    });

    // Chạy lần đầu tiên khi load trang
    renderTable();
}

//xử lý trang chi tiết đơn hàng
function renderOrderDetailPage() {
    // 1. Kiểm tra xem có đang ở trang order-detail không
    const orderIdSpan = $('#order-id');
    if (orderIdSpan.length === 0) return;

    // 2. Lấy mã đơn hàng (orderId) từ URL
    // Ví dụ: order-detail.html?id=DH-123456
    const orderId = getUrlParam('id');
    if (!orderId) {
        alert("Không tìm thấy mã đơn hàng!");
        window.location.href = 'orders.html';
        return;
    }

    // 3. Tìm đơn hàng trong LocalStorage
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    const order = orders.find(o => o.id === orderId);

    if (!order) {
        $('.container').html(`
            <div class="alert alert-danger text-center my-5">
                <h4>Lỗi!</h4>
                <p>Đơn hàng <strong>${orderId}</strong> không tồn tại trong hệ thống.</p>
                <a href="orders.html" class="btn btn-primary mt-3">Quay lại danh sách</a>
            </div>
        `);
        return;
    }

    // 4. Hiển thị thông tin chung
    orderIdSpan.text('#' + order.id);

    // Điền thông tin khách hàng (Thanh trống thứ nhất)
    $('#customer-info').html(`
        <h5 class="fw-bold mb-3" style="color: var(--primary-color);">Thông tin nhận hàng</h5>
        <p class="mb-1"><strong>Người nhận:</strong> ${order.customerName}</p>
        <p class="mb-1"><strong>Điện thoại:</strong> ${order.phone}</p>
        <p class="mb-0"><strong>Địa chỉ:</strong> ${order.address}</p>
    `);

    // Điền thông tin hóa đơn (Thanh trống thứ hai)
    $('#order-info').html(`
        <h5 class="fw-bold mb-3" style="color: var(--primary-color);">Thông tin đơn hàng</h5>
        <p class="mb-1"><strong>Ngày đặt:</strong> ${order.date}</p>
        <p class="mb-1"><strong>Thanh toán:</strong> ${order.payment}</p>
        <p class="mb-0"><strong>Trạng thái:</strong> <span class="badge bg-warning text-dark">${order.status}</span></p>
    `);

    // 5. Hiển thị danh sách sản phẩm trong bảng
    const orderItemsTable = $('#order-items');
    orderItemsTable.empty();

    order.items.forEach(function (item) {
        const book = getBookById(item.id); // Lấy thông tin sách từ data.js
        if (!book) return;

        const itemTotal = book.price * item.quantity;

        let tr = `
            <tr>
                <td class="ps-3">
                    <div class="d-flex align-items-center gap-3">
                        <img src="${book.image}" alt="${book.title}" class="rounded shadow-sm" style="width: 45px; height: 60px; object-fit: cover;">
                        <div>
                            <p class="mb-0 fw-bold small">${book.title}</p>
                            <small class="text-muted">Mã: HDTTT-${String(book.id).padStart(3, '0')}</small>
                        </div>
                    </div>
                </td>
                <td>${formatPrice(book.price)}</td>
                <td>${item.quantity}</td>
                <td class="pe-3 fw-bold">${formatPrice(itemTotal)}</td>
            </tr>
        `;
        orderItemsTable.append(tr);
    });

    // 6. Hiển thị tổng cộng
    $('#total-price').text(formatPrice(order.total));
}

//xử lý chi tiết tin tức bằng modal
function showNewsDetail(newsId) {
    // 1. Tìm tin tức trong mảng newsList (từ data.js)
    const news = newsList.find(item => item.id === newsId);

    if (news) {
        // 2. Điền dữ liệu vào các phần tử trong Modal
        $('#modal-news-title').text(news.title);
        $('#modal-news-img').attr('src', news.image);
        $('#modal-news-date').text(news.date);
        $('#modal-news-author').text(news.author || "HDTTT Bookstore");
        $('#modal-news-content').html(news.content);

        // 3. Hiển thị Modal (Sử dụng thư viện Bootstrap đã nhúng offline)
        const myModal = new bootstrap.Modal(document.getElementById('newsModal'));
        myModal.show();
    } else {
        alert("Không tìm thấy nội dung tin tức này!");
    }
}