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

// =====================================================
// Hàm kiểm tra trạng thái đăng nhập (Đã bổ sung nút Đơn hàng)
// =====================================================
function checkLoginStatus() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const navbarNav = $('.navbar-nav');

    if (currentUser) {
        // Xóa nút Đăng nhập / Đăng ký cũ
        navbarNav.find('a[href="login.html"]').parent().remove();
        navbarNav.find('a[href="register.html"]').parent().remove();

        // CHỐNG NHÂN BẢN: Kiểm tra xem nút Đăng xuất đã tồn tại chưa
        // Chỉ thêm mới nếu chưa có id="btn-logout" trên Navbar
        if ($('#btn-logout').length === 0) {
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
            navbarNav.append(userHtml);

            // Xử lý sự kiện đăng xuất
            $('#btn-logout').on('click', function () {
                if (confirm("Bạn có chắc chắn muốn đăng xuất không?")) {
                    localStorage.removeItem('currentUser');
                    alert("Đã đăng xuất thành công!");
                    window.location.href = 'index.html';
                }
            });
        }
    }
}

function setActiveNavLink() {
    const path = window.location.pathname;
    const currentPage = path.split("/").pop();

    const navLinks = document.querySelectorAll(".navbar .nav-link");

    // Vòng lặp for truyền thống với biến đếm i
    for (let i = 0; i < navLinks.length; i++) {
        const link = navLinks[i]; // Lấy phần tử tại vị trí i
        const linkPage = link.getAttribute("href");

        if (linkPage === currentPage) {
            link.classList.add("active");
        } else {
            link.classList.remove("active");
        }
    }
}


// =====================================================
// 2. updateCartCount()
// Chức năng:
// - Đọc dữ liệu giỏ hàng từ LocalStorage
// - Tính tổng số lượng sản phẩm trong giỏ
// - Hiển thị số lượng đó lên badge "Giỏ hàng" trên navbar
//
// LocalStorage key sử dụng: "cart"
// Dữ liệu mẫu:
// [
//   { id: 1, quantity: 2 },
//   { id: 13, quantity: 1 }
// ]
// =====================================================
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    let totalQuantity = 0;

    cart.forEach(function (item) {
        totalQuantity += item.quantity || 1;
    });

    $("#cart-count").text(totalQuantity);
}


// =====================================================
// 3. handleSearchForm()
// Chức năng:
// - Xử lý các form tìm kiếm có class .search-box
// - Dùng được cho cả index.html và products.html
// - Nếu người dùng nhập từ khóa thì chuyển sang:
//   products.html?keyword=tu-khoa
// - Nếu ô tìm kiếm trống thì chuyển sang products.html
// =====================================================
function handleSearchForm() {
    $(".search-box").on("submit", function (event) {
        event.preventDefault();

        const keyword = $(this).find("input[name='keyword']").val().trim();

        if (keyword === "") {
            window.location.href = "products.html";
        } else {
            window.location.href = "products.html?keyword=" + encodeURIComponent(keyword);
        }
    });
}


// =====================================================
// 4. renderFeaturedBooks()
// Chức năng:
// - Lấy danh sách sách nổi bật từ data.js
// - Chỉ hiển thị 4 sách đầu tiên
// - Tự động tạo card sách và đưa vào index.html
//
// Điều kiện:
// - Trong index.html phải có thẻ:
//   <div class="row g-4" id="featured-books"></div>
// =====================================================
function renderFeaturedBooks() {
    const container = $("#featured-books");

    // Nếu trang hiện tại không có khu vực sách nổi bật thì không chạy
    if (container.length === 0) {
        return;
    }

    const featuredBooks = getFeaturedBooks().slice(0, 4);
    let html = "";

    featuredBooks.forEach(function (book) {
        const category = getCategoryById(book.categoryId);
        const categoryName = category ? category.name : "Sách";

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

    container.html(html);
}


// =====================================================
// 5. getUrlParam(paramName)
// Chức năng:
// - Lấy giá trị tham số trên URL
// - Dùng cho products.html, product-detail.html,
//   news-detail.html, order-detail.html
//
// Ví dụ:
// URL: product-detail.html?id=5
// getUrlParam("id") sẽ trả về "5"
// =====================================================
function getUrlParam(paramName) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(paramName);
}


// =====================================================
// PHẦN PRODUCTS.HTML VÀ PRODUCT-DETAIL.HTML
// Chức năng:
// - Render danh sách sản phẩm từ data.js
// - Lọc sách theo từ khóa, thể loại, giá
// - Sắp xếp sách
// - Phân trang
// - Render chi tiết 1 quyển sách theo id trên URL
// - Thêm sách vào giỏ hàng bằng LocalStorage
// =====================================================


// Số lượng sách hiển thị trên mỗi trang products.html
const PRODUCTS_PER_PAGE = 9;


// =====================================================
// 6. renderProductsPage()
// Chức năng:
// - Kiểm tra xem trang hiện tại có phải products.html không
// - Đọc các tham số trên URL như keyword, category, price, sort, page
// - Lọc sách theo từ khóa, thể loại, khoảng giá
// - Sắp xếp sách nếu người dùng chọn
// - Cắt danh sách sách theo trang hiện tại
// - Gọi renderBookList() để hiển thị sách
// - Gọi renderProductPagination() để hiển thị phân trang
// =====================================================
function renderProductsPage() {
    const productList = $("#product-list");

    // Nếu không có id product-list nghĩa là không phải trang products.html
    if (productList.length === 0) {
        return;
    }

    const keyword = getUrlParam("keyword") || "";
    const category = getUrlParam("category") || "";
    const price = getUrlParam("price") || "";
    const sort = getUrlParam("sort") || "default";
    const page = Number(getUrlParam("page")) || 1;

    $("#filterKeyword").val(keyword);
    $("#filterCategory").val(category);
    $("#filterPrice").val(price);
    $("#sortProduct").val(sort);

    let filteredBooks = books.filter(function (book) {
        const matchKeyword =
            keyword === "" ||
            book.title.toLowerCase().includes(keyword.toLowerCase()) ||
            book.author.toLowerCase().includes(keyword.toLowerCase()) ||
            book.description.toLowerCase().includes(keyword.toLowerCase());

        const matchCategory =
            category === "" || book.categoryId === category;

        let matchPrice = true;

        if (price === "duoi-100") {
            matchPrice = book.price < 100000;
        } else if (price === "100-150") {
            matchPrice = book.price >= 100000 && book.price <= 150000;
        } else if (price === "tren-150") {
            matchPrice = book.price > 150000;
        }

        return matchKeyword && matchCategory && matchPrice;
    });

    if (sort === "price-asc") {
        filteredBooks.sort(function (a, b) {
            return a.price - b.price;
        });
    } else if (sort === "price-desc") {
        filteredBooks.sort(function (a, b) {
            return b.price - a.price;
        });
    } else if (sort === "name-asc") {
        filteredBooks.sort(function (a, b) {
            return a.title.localeCompare(b.title, "vi");
        });
    }

    const totalPages = Math.ceil(filteredBooks.length / PRODUCTS_PER_PAGE);
    const validPage = Math.min(Math.max(page, 1), totalPages || 1);
    const startIndex = (validPage - 1) * PRODUCTS_PER_PAGE;

    const booksOnPage = filteredBooks.slice(
        startIndex,
        startIndex + PRODUCTS_PER_PAGE
    );

    renderBookList(booksOnPage);
    renderProductPagination(totalPages, validPage);
    handleProductFilterForm();
    handleProductSort();
}


// =====================================================
// 7. renderBookList(bookArray)
// Chức năng:
// - Nhận vào một mảng sách
// - Tạo HTML card cho từng quyển sách
// - Đưa toàn bộ card vào #product-list
// - Nếu không có sách phù hợp thì hiện thông báo
// =====================================================
function renderBookList(bookArray) {
    const productList = $("#product-list");

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

    let html = "";

    bookArray.forEach(function (book) {
        const category = getCategoryById(book.categoryId);
        const categoryName = category ? category.name : "Sách";

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

    productList.html(html);
}


// =====================================================
// 8. renderProductPagination(totalPages, currentPage)
// Chức năng:
// - Nhận tổng số trang và trang hiện tại
// - Tạo nút Trước, Sau và các nút số trang
// - Trang hiện tại sẽ được thêm class active
// - Nếu chỉ có 1 trang thì không hiện phân trang
// =====================================================
function renderProductPagination(totalPages, currentPage) {
    const pagination = $("#product-pagination");

    if (pagination.length === 0) {
        return;
    }

    if (totalPages <= 1) {
        pagination.html("");
        return;
    }

    let html = "";

    html += `
        <li class="page-item ${currentPage === 1 ? "disabled" : ""}">
            <a class="page-link" href="${buildProductUrl(currentPage - 1)}">
                Trước
            </a>
        </li>
    `;

    for (let i = 1; i <= totalPages; i++) {
        html += `
            <li class="page-item ${i === currentPage ? "active" : ""}">
                <a class="page-link" href="${buildProductUrl(i)}">
                    ${i}
                </a>
            </li>
        `;
    }

    html += `
        <li class="page-item ${currentPage === totalPages ? "disabled" : ""}">
            <a class="page-link" href="${buildProductUrl(currentPage + 1)}">
                Sau
            </a>
        </li>
    `;

    pagination.html(html);
}


// =====================================================
// 9. buildProductUrl(page)
// Chức năng:
// - Tạo lại URL cho products.html khi người dùng bấm phân trang
// - Giữ nguyên các tham số lọc hiện tại như keyword, category, price, sort
// - Chỉ thay đổi tham số page
//
// Ví dụ:
// products.html?category=cong-nghe&page=2
// =====================================================
function buildProductUrl(page) {
    const params = new URLSearchParams(window.location.search);

    params.set("page", page);

    return "products.html?" + params.toString();
}


// =====================================================
// 10. handleProductFilterForm()
// Chức năng:
// - Xử lý khi người dùng bấm nút "Lọc sách"
// - Lấy dữ liệu từ form lọc
// - Tạo URL mới dựa theo keyword, category, price
// - Chuyển trang đến URL đó để render lại danh sách sách
// =====================================================
function handleProductFilterForm() {
    $("#product-filter-form").on("submit", function (event) {
        event.preventDefault();

        const keyword = $("#filterKeyword").val().trim();
        const category = $("#filterCategory").val();
        const price = $("#filterPrice").val();

        const params = new URLSearchParams();

        if (keyword !== "") {
            params.set("keyword", keyword);
        }

        if (category !== "") {
            params.set("category", category);
        }

        if (price !== "") {
            params.set("price", price);
        }

        params.set("page", 1);

        window.location.href = "products.html?" + params.toString();
    });
}


// =====================================================
// 11. handleProductSort()
// Chức năng:
// - Xử lý khi người dùng chọn sắp xếp
// - Cập nhật tham số sort trên URL
// - Chuyển lại về page 1 sau khi đổi kiểu sắp xếp
// =====================================================
function handleProductSort() {
    $("#sortProduct").on("change", function () {
        const params = new URLSearchParams(window.location.search);
        const sort = $(this).val();

        if (sort === "default") {
            params.delete("sort");
        } else {
            params.set("sort", sort);
        }

        params.set("page", 1);

        window.location.href = "products.html?" + params.toString();
    });
}


// =====================================================
// 12. renderProductDetail()
// Chức năng:
// - Kiểm tra xem trang hiện tại có phải product-detail.html không
// - Lấy id sách từ URL
// - Tìm sách trong mảng books bằng getBookById()
// - Nếu có sách thì đổ dữ liệu lên giao diện chi tiết
// - Nếu không có sách thì hiển thị thông báo lỗi
// - Gọi renderRelatedBooks() để hiển thị sách liên quan
// =====================================================
function renderProductDetail() {
    if ($("#detail-book-title").length === 0) {
        return;
    }

    const id = getUrlParam("id") || 1;
    const book = getBookById(id);

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

    $("#detail-book-image").attr("src", book.image);
    $("#detail-book-image").attr("alt", "Sách " + book.title);

    $("#detail-book-category").text(categoryName);
    $("#detail-book-title").text(book.title);
    $("#detail-book-author").text(book.author);
    $("#detail-book-rating").text("★★★★★ " + book.rating);
    $("#detail-book-code").text("HDTTT-" + String(book.id).padStart(3, "0"));

    $("#detail-book-stock").text(book.stock > 0 ? "Còn hàng" : "Hết hàng");
    $("#detail-book-price").text(formatPrice(book.price));
    $("#detail-book-old-price").text(formatPrice(book.oldPrice));

    $("#detail-book-description").text(book.description);
    $("#detail-book-long-description").text(book.longDescription || book.description);
    $("#detail-book-publisher").text(book.publisher);
    $("#detail-book-year").text(book.year);
    $("#detail-book-pages").text(book.pages + " trang");
    $("#detail-book-quantity-stock").text(book.stock + " quyển");

    $("#quantity").attr("max", book.stock);
    $("#detail-discount").text("Tiết kiệm " + discount + "%");

    renderRelatedBooks(book);
}


// =====================================================
// 13. renderRelatedBooks(currentBook)
// Chức năng:
// - Nhận vào sách hiện tại
// - Lọc ra các sách cùng thể loại
// - Loại bỏ chính sách đang xem
// - Lấy tối đa 4 sách liên quan
// - Render thành card và đưa vào #related-books
// =====================================================
function renderRelatedBooks(currentBook) {
    const container = $("#related-books");

    if (container.length === 0) {
        return;
    }

    const relatedBooks = books
        .filter(function (book) {
            return book.categoryId === currentBook.categoryId &&
                book.id !== currentBook.id;
        })
        .slice(0, 4);

    let html = "";

    relatedBooks.forEach(function (book) {
        const category = getCategoryById(book.categoryId);
        const categoryName = category ? category.name : "Sách";

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


// =====================================================
// 14. handleAddToCart()
// Chức năng:
// - Gắn sự kiện click cho nút "Thêm vào giỏ hàng"
// - Lấy id sách từ URL
// - Lấy số lượng người dùng nhập
// - Kiểm tra sách có tồn tại không
// - Kiểm tra số lượng hợp lệ không
// - Gọi addToCart() để lưu sách vào LocalStorage
// - Cập nhật lại số lượng giỏ hàng trên navbar
// =====================================================
function handleAddToCart() {
    $("#btn-add-cart").on("click", function () {
        const id = Number(getUrlParam("id") || 1);
        const book = getBookById(id);

        if (!book) {
            alert("Không tìm thấy sách để thêm vào giỏ hàng.");
            return;
        }

        const quantity = Number($("#quantity").val());

        if (quantity < 1) {
            alert("Số lượng phải lớn hơn 0.");
            return;
        }

        if (quantity > book.stock) {
            alert("Số lượng vượt quá số sách còn trong kho.");
            return;
        }

        addToCart(book.id, quantity);
        updateCartCount();

        alert("Đã thêm sách vào giỏ hàng!");
    });
}


// =====================================================
// 15. addToCart(bookId, quantity)
// Chức năng:
// - Đọc giỏ hàng từ LocalStorage
// - Nếu sách đã có trong giỏ thì tăng số lượng
// - Nếu sách chưa có thì thêm sách mới vào giỏ
// - Lưu lại giỏ hàng vào LocalStorage
//
// Dữ liệu lưu trong LocalStorage có dạng:
// [
//   { id: 1, quantity: 2 },
//   { id: 13, quantity: 1 }
// ]
// =====================================================
function addToCart(bookId, quantity) {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existingItem = cart.find(function (item) {
        return item.id === bookId;
    });

    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            id: bookId,
            quantity: quantity
        });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
}

// Thêm đoạn này vào main.js hoặc script tag trong register.html
$(document).ready(function () {
    // Xử lý sự kiện submit form Đăng ký
    $('form[action="login.html"]').on('submit', function (e) {
        e.preventDefault(); // Ngăn load lại trang

        // 1. Lấy dữ liệu từ các ô input
        const fullName = $('#registerName').val().trim();
        const email = $('#registerEmail').val().trim();
        const password = $('#registerPassword').val();
        const confirmPassword = $('#registerConfirmPassword').val();
        const termsAccepted = $('#termsCheck').is(':checked');

        // 2. Kiểm tra dữ liệu (Validation)
        if (password !== confirmPassword) {
            alert("Mật khẩu xác nhận không khớp. Vui lòng kiểm tra lại!");
            return;
        }

        if (!termsAccepted) {
            alert("Bạn phải đồng ý với điều khoản dịch vụ để đăng ký.");
            return;
        }

        // 3. Kiểm tra trùng lặp Email
        // Lấy danh sách user từ data.js và từ LocalStorage (nếu có)
        const localUsers = JSON.parse(localStorage.getItem('localUsers')) || [];
        const allUsers = [...users, ...localUsers]; // Gộp cả user mẫu và user mới đăng ký

        const isExisted = allUsers.some(user => user.email === email);
        if (isExisted) {
            alert("Email này đã được sử dụng. Vui lòng chọn email khác!");
            return;
        }

        // 4. Tạo đối tượng người dùng mới
        const newUser = {
            id: Date.now(), // Tạo ID duy nhất bằng timestamp
            fullName: fullName,
            email: email,
            password: password,
            role: "user"
        };

        // 5. Lưu vào LocalStorage
        localUsers.push(newUser);
        localStorage.setItem('localUsers', JSON.stringify(localUsers));

        // 6. Thông báo và chuyển hướng
        alert("Đăng ký thành công! Bạn có thể đăng nhập ngay bây giờ.");
        window.location.href = 'login.html';
    });
});

// Thêm đoạn này vào main.js hoặc script tag trong login.html
$(document).ready(function () {
    // Xử lý sự kiện submit form Đăng nhập
    $('form[action="index.html"]').on('submit', function (e) {
        e.preventDefault(); // Ngăn load lại trang

        const email = $('#loginEmail').val().trim();
        const password = $('#loginPassword').val();
        const rememberMe = $('#rememberMe').is(':checked');

        // 1. Lấy tất cả người dùng (từ file data.js và từ bộ nhớ LocalStorage)
        const localUsers = JSON.parse(localStorage.getItem('localUsers')) || [];
        const allUsers = [...users, ...localUsers];

        // 2. Tìm kiếm người dùng khớp thông tin
        const userFound = allUsers.find(u => u.email === email && u.password === password);

        if (userFound) {
            // 3. Đăng nhập thành công
            // Lưu trạng thái đăng nhập vào LocalStorage
            localStorage.setItem('currentUser', JSON.stringify({
                fullName: userFound.fullName,
                email: userFound.email,
                role: userFound.role
            }));

            if (rememberMe) {
                localStorage.setItem('rememberedEmail', email);
            } else {
                localStorage.removeItem('rememberedEmail');
            }

            alert("Chào mừng " + userFound.fullName + " quay trở lại!");
            window.location.href = 'index.html';
        } else {
            // 4. Sai thông tin
            alert("Email hoặc mật khẩu không chính xác. Vui lòng thử lại!");
        }
    });

    // Tự động điền email nếu người dùng đã chọn "Ghi nhớ tài khoản" trước đó
    const savedEmail = localStorage.getItem('rememberedEmail');
    if (savedEmail) {
        $('#loginEmail').val(savedEmail);
        $('#rememberMe').prop('checked', true);
    }
});

$(document).ready(function () {
    // Các hàm cũ của bạn...
    checkLoginStatus();
});



// ==========================================
// XỬ LÝ TRANG GIỎ HÀNG (Dựa trên data.js)
// ==========================================

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

    // 1. Lắng nghe sự kiện THAY ĐỔI SỐ LƯỢNG
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

    // 2. Lắng nghe sự kiện XÓA 1 SẢN PHẨM
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

    // 3. Lắng nghe sự kiện XÓA TẤT CẢ
    $('#btn-clear-cart').on('click', function () {
        if (confirm("Bạn có chắc chắn muốn xóa toàn bộ giỏ hàng?")) {
            localStorage.removeItem('cart');
            renderCartPage();
            updateCartCount();
        }
    });
});

// ==========================================
// XỬ LÝ TRANG THANH TOÁN (CHECKOUT)
// ==========================================
function renderCheckoutPage() {
    // 1. Kiểm tra xem có đang ở trang checkout không (dựa vào ID #checkout-items)
    const checkoutContainer = $('#checkout-items');
    if (checkoutContainer.length === 0) return;

    // 2. Lấy giỏ hàng từ LocalStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Nếu giỏ trống, báo lỗi và đẩy về trang sách
    if (cart.length === 0) {
        alert("Giỏ hàng của bạn đang trống! Vui lòng chọn sách trước khi thanh toán.");
        window.location.href = "products.html";
        return;
    }

    let subtotal = 0;
    checkoutContainer.empty(); // Xóa nội dung cũ

    // 3. Render danh sách sản phẩm trong đơn hàng
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

    // 4. Hàm tính toán và hiển thị các loại phí
    function updateCheckoutTotals() {
        // Đọc xem người dùng chọn loại ship nào
        let shippingMethod = $('input[name="shipping"]:checked').val();
        let shippingFee = 0;

        if (shippingMethod === 'standard') {
            // Đơn từ 300k miễn phí ship tiêu chuẩn
            shippingFee = subtotal >= 300000 ? 0 : 20000;
        } else if (shippingMethod === 'fast') {
            shippingFee = 40000; // Giao nhanh cố định 40k
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

    // 5. Xử lý sự kiện khi nhấn nút "Đặt hàng"
    $('#btn-place-order').on('click', function () {
        // Kiểm tra dữ liệu nhập cơ bản
        const fullName = $('#full-name').val().trim();
        const phone = $('#phone').val().trim();
        const email = $('#email').val().trim();
        const address = $('#address').val().trim();
        const province = $('#province').val();
        const district = $('#district').val().trim();

        // Kiểm tra nếu các ô bắt buộc bị bỏ trống
        if (!fullName || !phone || !email || !address || !province || !district) {
            alert("Vui lòng điền đầy đủ các thông tin nhận hàng (những ô có dấu *)!");
            return;
        }

        // Tạo mã đơn hàng ngẫu nhiên đẹp mắt (Ví dụ: DH-849204)
        const orderId = "DH-" + Math.floor(100000 + Math.random() * 900000);

        // Lấy phương thức thanh toán
        const paymentMethod = $('input[name="payment"]:checked').next('label').text().trim().split('\n')[0];

        // Tạo đối tượng đơn hàng mới
        const newOrder = {
            id: orderId,
            date: new Date().toLocaleDateString('vi-VN'),
            customerName: fullName,
            phone: phone,
            address: `${address}, ${district}, ${province}`,
            items: cart,
            total: parseInt($('#checkout-total').text().replace(/\D/g, '')), // Lọc lấy số từ chuỗi tổng tiền
            status: orderStatus.pending, // Trạng thái "Chờ xử lý" lấy từ data.js
            payment: paymentMethod
        };

        // Lưu đơn hàng vào LocalStorage (vào mảng orders)
        let orders = JSON.parse(localStorage.getItem('orders')) || [];
        orders.unshift(newOrder); // Đẩy đơn hàng mới nhất lên đầu mảng
        localStorage.setItem('orders', JSON.stringify(orders));

        // Xóa sạch giỏ hàng vì đã thanh toán xong
        localStorage.removeItem('cart');

        // Thông báo thành công và chuyển hướng
        alert(`🎉 Đặt hàng thành công!\nMã đơn hàng của bạn là: ${orderId}\nChúng tôi sẽ sớm liên hệ để giao hàng.`);
        window.location.href = 'index.html'; // Hoặc chuyển sang trang orders.html nếu bạn đã làm xong
    });
}

// ==========================================
// XỬ LÝ TRANG DANH SÁCH ĐƠN HÀNG (ORDERS)
// ==========================================

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

// ==========================================
// XỬ LÝ TRANG CHI TIẾT ĐƠN HÀNG (ORDER DETAIL)
// ==========================================
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

// =====================================================
// Xử lý hiển thị chi tiết tin tức bằng Modal
// =====================================================
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

function renderLatestNewsIndex() {
    const newsContainer = $('#latest-news-container');
    if (newsContainer.length === 0 || typeof newsList === 'undefined') return;

    // Lấy 3 bài tin tức đầu tiên
    const latestNews = newsList.slice(0, 3);
    let html = '';

    latestNews.forEach(news => {
        html += `
            <div class="col-md-4">
                <div class="card h-100 border-0 shadow-sm overflow-hidden news-card">
                    <img src="${news.image}" class="card-img-top" alt="${news.title}" style="height: 200px; object-fit: cover;">
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

    newsContainer.html(html);
}
function renderAllNewsPage() {
    const container = $('#news-list'); // ID trong news.html
    if (container.length === 0) return;

    let html = "";
    newsList.forEach(news => {
        html += `
            <div class="col-md-4">
                <div class="card h-100 shadow-sm news-card">
                    <img src="${news.image}" class="card-img-top" alt="${news.title}">
                    <div class="card-body">
                        <h5 class="card-title fw-bold">${news.title}</h5>
                        <p class="text-muted small">${news.summary}</p>
                        <button class="btn btn-primary btn-sm" onclick="showNewsDetail(${news.id})">Xem chi tiết</button>
                    </div>
                </div>
            </div>
        `;
    });
    container.html(html);
}