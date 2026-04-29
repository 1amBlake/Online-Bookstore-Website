// =============================
// Lưu dữ liệu mẫu cho website bán sách
// =============================

// Danh mục sách
const categories = [
    {
        id: "van-hoc",
        name: "Văn học"
    },
    {
        id: "kinh-te",
        name: "Kinh tế"
    },
    {
        id: "ky-nang",
        name: "Kỹ năng sống"
    },
    {
        id: "thieu-nhi",
        name: "Thiếu nhi"
    },
    {
        id: "cong-nghe",
        name: "Công nghệ"
    }
];

// Danh sách sách
const books = [
    {
        id: 1,
        title: "Nhà Giả Kim",
        author: "Paulo Coelho",
        categoryId: "van-hoc",
        price: 89000,
        oldPrice: 109000,
        image: "../img/book_img/book_1.jpg",
        description: "Một cuốn sách nổi tiếng về hành trình theo đuổi ước mơ và khám phá ý nghĩa cuộc sống.",
        pages: 228,
        publisher: "NXB Văn Học",
        year: 2022,
        stock: 25,
        rating: 4.8,
        featured: true
    },
    {
        id: 2,
        title: "The Lord of the Rings",
        author: "J.R.R. Tolkien",
        categoryId: "van-hoc",
        price: 245000,
        oldPrice: 289000,
        image: "../img/book_img/book_2.jpg",
        description: "Tác phẩm giả tưởng kinh điển kể về hành trình tiêu hủy chiếc nhẫn quyền lực.",
        pages: 1178,
        publisher: "NXB Văn Học",
        year: 2021,
        stock: 18,
        rating: 4.9,
        featured: true
    },
    {
        id: 3,
        title: "Tôi Thấy Hoa Vàng Trên Cỏ Xanh",
        author: "Nguyễn Nhật Ánh",
        categoryId: "van-hoc",
        price: 95000,
        oldPrice: 115000,
        image: "../img/book_img/book_3.jpg",
        description: "Câu chuyện nhẹ nhàng, trong trẻo về tuổi thơ, tình bạn và tình thân.",
        pages: 378,
        publisher: "NXB Trẻ",
        year: 2023,
        stock: 32,
        rating: 4.7,
        featured: false
    },
    {
        id: 4,
        title: "Không Gia Đình",
        author: "Hector Malot",
        categoryId: "van-hoc",
        price: 125000,
        oldPrice: 150000,
        image: "../img/book_img/book_4.jpg",
        description: "Tiểu thuyết cảm động về hành trình trưởng thành của cậu bé Rémi.",
        pages: 520,
        publisher: "NXB Kim Đồng",
        year: 2020,
        stock: 20,
        rating: 4.6,
        featured: false
    },
    {
        id: 5,
        title: "Hoàng Tử Bé",
        author: "Antoine de Saint-Exupéry",
        categoryId: "van-hoc",
        price: 69000,
        oldPrice: 89000,
        image: "../img/book_img/book_5.jpg",
        description: "Tác phẩm giàu tính triết lý về tình bạn, tình yêu và cách nhìn cuộc sống.",
        pages: 120,
        publisher: "NXB Hội Nhà Văn",
        year: 2022,
        stock: 35,
        rating: 4.8,
        featured: false
    },
    {
        id: 6,
        title: "Số Đỏ",
        author: "Vũ Trọng Phụng",
        categoryId: "van-hoc",
        price: 76000,
        oldPrice: 95000,
        image: "../img/book_img/book_6.jpg",
        description: "Tác phẩm trào phúng nổi bật của văn học Việt Nam hiện đại.",
        pages: 280,
        publisher: "NXB Văn Học",
        year: 2021,
        stock: 22,
        rating: 4.5,
        featured: false
    },
    {
        id: 7,
        title: "Tư Duy Nhanh Và Chậm",
        author: "Daniel Kahneman",
        categoryId: "kinh-te",
        price: 159000,
        oldPrice: 189000,
        image: "../img/book_img/book_7.jpg",
        description: "Sách phân tích cách con người tư duy, ra quyết định và xử lý thông tin.",
        pages: 612,
        publisher: "NXB Thế Giới",
        year: 2020,
        stock: 18,
        rating: 4.7,
        featured: true
    },
    {
        id: 8,
        title: "Cha Giàu Cha Nghèo",
        author: "Robert T. Kiyosaki",
        categoryId: "kinh-te",
        price: 98000,
        oldPrice: 120000,
        image: "../img/book_img/book_8.jpg",
        description: "Cuốn sách nổi tiếng về tư duy tài chính cá nhân và cách quản lý tiền bạc.",
        pages: 336,
        publisher: "NXB Trẻ",
        year: 2022,
        stock: 40,
        rating: 4.8,
        featured: false
    },
    {
        id: 9,
        title: "Người Giàu Có Nhất Thành Babylon",
        author: "George S. Clason",
        categoryId: "kinh-te",
        price: 79000,
        oldPrice: 99000,
        image: "../img/book_img/book_9.jpg",
        description: "Những bài học tài chính đơn giản, dễ hiểu thông qua các câu chuyện cổ xưa.",
        pages: 220,
        publisher: "NXB Tổng Hợp",
        year: 2021,
        stock: 28,
        rating: 4.6,
        featured: false
    },
    {
        id: 10,
        title: "Nhà Đầu Tư Thông Minh",
        author: "Benjamin Graham",
        categoryId: "kinh-te",
        price: 210000,
        oldPrice: 250000,
        image: "../img/book_img/book_10.jpg",
        description: "Một trong những cuốn sách kinh điển về đầu tư giá trị.",
        pages: 640,
        publisher: "NXB Lao Động",
        year: 2020,
        stock: 16,
        rating: 4.7,
        featured: false
    },
    {
        id: 11,
        title: "Quốc Gia Khởi Nghiệp",
        author: "Dan Senor, Saul Singer",
        categoryId: "kinh-te",
        price: 135000,
        oldPrice: 165000,
        image: "../img/book_img/book_11.jpg",
        description: "Câu chuyện về tinh thần đổi mới, sáng tạo và khởi nghiệp của Israel.",
        pages: 380,
        publisher: "NXB Thế Giới",
        year: 2021,
        stock: 21,
        rating: 4.5,
        featured: false
    },
    {
        id: 12,
        title: "Dạy Con Làm Giàu",
        author: "Robert T. Kiyosaki",
        categoryId: "kinh-te",
        price: 115000,
        oldPrice: 140000,
        image: "../img/book_img/book_12.jpg",
        description: "Bộ sách giúp người đọc hiểu thêm về tiền bạc, tài sản và tư duy làm giàu.",
        pages: 300,
        publisher: "NXB Trẻ",
        year: 2023,
        stock: 24,
        rating: 4.6,
        featured: false
    },
    {
        id: 13,
        title: "Đắc Nhân Tâm",
        author: "Dale Carnegie",
        categoryId: "ky-nang",
        price: 105000,
        oldPrice: 128000,
        image: "../img/book_img/book_13.jpg",
        description: "Cuốn sách kinh điển về nghệ thuật giao tiếp, ứng xử và xây dựng mối quan hệ.",
        pages: 320,
        publisher: "NXB Tổng Hợp",
        year: 2021,
        stock: 30,
        rating: 4.9,
        featured: true
    },
    {
        id: 14,
        title: "Tuổi Trẻ Đáng Giá Bao Nhiêu",
        author: "Rosie Nguyễn",
        categoryId: "ky-nang",
        price: 78000,
        oldPrice: 98000,
        image: "../img/book_img/book_14.jpg",
        description: "Gợi ý học tập, trải nghiệm, đọc sách và trưởng thành dành cho người trẻ.",
        pages: 285,
        publisher: "NXB Hội Nhà Văn",
        year: 2022,
        stock: 36,
        rating: 4.7,
        featured: true
    },
    {
        id: 15,
        title: "Atomic Habits",
        author: "James Clear",
        categoryId: "ky-nang",
        price: 145000,
        oldPrice: 175000,
        image: "../img/book_img/book_15.jpg",
        description: "Cuốn sách hướng dẫn xây dựng thói quen tốt thông qua những thay đổi nhỏ mỗi ngày.",
        pages: 320,
        publisher: "NXB Thế Giới",
        year: 2023,
        stock: 27,
        rating: 4.8,
        featured: false
    },
    {
        id: 16,
        title: "7 Thói Quen Hiệu Quả",
        author: "Stephen R. Covey",
        categoryId: "ky-nang",
        price: 155000,
        oldPrice: 185000,
        image: "../img/book_img/book_16.jpg",
        description: "Những nguyên tắc giúp phát triển bản thân, quản lý công việc và cuộc sống hiệu quả.",
        pages: 432,
        publisher: "NXB Tổng Hợp",
        year: 2021,
        stock: 19,
        rating: 4.6,
        featured: false
    },
    {
        id: 17,
        title: "Nghĩ Giàu Và Làm Giàu",
        author: "Napoleon Hill",
        categoryId: "ky-nang",
        price: 99000,
        oldPrice: 125000,
        image: "../img/book_img/book_17.jpg",
        description: "Cuốn sách truyền cảm hứng về tư duy thành công, mục tiêu và sự kiên trì.",
        pages: 300,
        publisher: "NXB Lao Động",
        year: 2020,
        stock: 26,
        rating: 4.5,
        featured: false
    },
    {
        id: 18,
        title: "Đi Tìm Lẽ Sống",
        author: "Viktor E. Frankl",
        categoryId: "ky-nang",
        price: 88000,
        oldPrice: 110000,
        image: "../img/book_img/book_18.jpg",
        description: "Một cuốn sách sâu sắc về ý nghĩa cuộc sống, nghị lực và tinh thần vượt khó.",
        pages: 220,
        publisher: "NXB Tổng Hợp",
        year: 2022,
        stock: 23,
        rating: 4.7,
        featured: false
    },
    {
        id: 19,
        title: "Harry Potter Và Hòn Đá Phù Thủy",
        author: "J.K. Rowling",
        categoryId: "thieu-nhi",
        price: 150000,
        oldPrice: 180000,
        image: "../img/book_img/book_19.jpg",
        description: "Tập đầu tiên trong series Harry Potter, kể về hành trình bước vào thế giới phù thủy.",
        pages: 366,
        publisher: "NXB Trẻ",
        year: 2022,
        stock: 34,
        rating: 4.9,
        featured: true
    },
    {
        id: 20,
        title: "Dế Mèn Phiêu Lưu Ký",
        author: "Tô Hoài",
        categoryId: "thieu-nhi",
        price: 65000,
        oldPrice: 80000,
        image: "../img/book_img/book_20.jpg",
        description: "Tác phẩm thiếu nhi nổi tiếng kể về cuộc phiêu lưu của chú Dế Mèn.",
        pages: 180,
        publisher: "NXB Kim Đồng",
        year: 2023,
        stock: 40,
        rating: 4.6,
        featured: false
    },
    {
        id: 21,
        title: "Chuyện Con Mèo Dạy Hải Âu Bay",
        author: "Luis Sepúlveda",
        categoryId: "thieu-nhi",
        price: 72000,
        oldPrice: 90000,
        image: "../img/book_img/book_21.jpg",
        description: "Câu chuyện cảm động về lời hứa, tình bạn và sự yêu thương giữa các loài vật.",
        pages: 144,
        publisher: "NXB Hội Nhà Văn",
        year: 2021,
        stock: 31,
        rating: 4.7,
        featured: false
    },
    {
        id: 22,
        title: "Totto-Chan Bên Cửa Sổ",
        author: "Tetsuko Kuroyanagi",
        categoryId: "thieu-nhi",
        price: 98000,
        oldPrice: 120000,
        image: "../img/book_img/book_22.jpg",
        description: "Câu chuyện trong trẻo về tuổi thơ, giáo dục và sự tôn trọng cá tính của trẻ nhỏ.",
        pages: 300,
        publisher: "NXB Văn Học",
        year: 2022,
        stock: 29,
        rating: 4.8,
        featured: false
    },
    {
        id: 23,
        title: "Alice Ở Xứ Sở Thần Tiên",
        author: "Lewis Carroll",
        categoryId: "thieu-nhi",
        price: 85000,
        oldPrice: 105000,
        image: "../img/book_img/book_23.jpg",
        description: "Câu chuyện kỳ ảo về chuyến phiêu lưu của Alice trong thế giới lạ lùng.",
        pages: 200,
        publisher: "NXB Kim Đồng",
        year: 2020,
        stock: 22,
        rating: 4.5,
        featured: false
    },
    {
        id: 24,
        title: "Peter Pan",
        author: "J.M. Barrie",
        categoryId: "thieu-nhi",
        price: 82000,
        oldPrice: 99000,
        image: "../img/book_img/book_24.jpg",
        description: "Câu chuyện về cậu bé không bao giờ lớn và những chuyến phiêu lưu ở Neverland.",
        pages: 240,
        publisher: "NXB Kim Đồng",
        year: 2021,
        stock: 24,
        rating: 4.4,
        featured: false
    },
    {
        id: 25,
        title: "Clean Code",
        author: "Robert C. Martin",
        categoryId: "cong-nghe",
        price: 220000,
        oldPrice: 260000,
        image: "../img/book_img/book_25.jpg",
        description: "Cuốn sách nổi tiếng về nguyên tắc viết mã nguồn rõ ràng, dễ đọc và dễ bảo trì.",
        pages: 464,
        publisher: "NXB Công Nghệ",
        year: 2021,
        stock: 15,
        rating: 4.8,
        featured: true
    },
    {
        id: 26,
        title: "Eloquent JavaScript",
        author: "Marijn Haverbeke",
        categoryId: "cong-nghe",
        price: 120000,
        oldPrice: 145000,
        image: "../img/book_img/book_26.jpg",
        description: "Sách hướng dẫn JavaScript từ nền tảng đến các khái niệm nâng cao, phù hợp cho người học lập trình web.",
        pages: 472,
        publisher: "No Starch Press",
        year: 2018,
        stock: 15,
        rating: 4.5,
        featured: false
    },
    {
        id: 27,
        title: "HTML and CSS: Design and Build Websites",
        author: "Jon Duckett",
        categoryId: "cong-nghe",
        price: 135000,
        oldPrice: 160000,
        image: "../img/book_img/book_27.jpg",
        description: "Sách nhập môn trực quan về HTML và CSS, phù hợp cho người mới bắt đầu thiết kế giao diện website.",
        pages: 490,
        publisher: "Wiley",
        year: 2011,
        stock: 21,
        rating: 4.6,
        featured: false
    },
    {
        id: 28,
        title: "Database System Concepts",
        author: "Abraham Silberschatz, Henry F. Korth, S. Sudarshan",
        categoryId: "cong-nghe",
        price: 210000,
        oldPrice: 250000,
        image: "../img/book_img/book_28.jpg",
        description: "Sách trình bày các khái niệm nền tảng về hệ quản trị cơ sở dữ liệu, mô hình dữ liệu, SQL, giao dịch và thiết kế cơ sở dữ liệu.",
        pages: 1376,
        publisher: "McGraw-Hill Education",
        year: 2019,
        stock: 18,
        rating: 4.5,
        featured: false
    },
    {
        id: 29,
        title: "You Don't Know JS Yet",
        author: "Kyle Simpson",
        categoryId: "cong-nghe",
        price: 155000,
        oldPrice: 185000,
        image: "../img/book_img/book_29.jpg",
        description: "Bộ sách giúp người học hiểu sâu hơn về JavaScript, từ phạm vi biến, closure đến cơ chế hoạt động của ngôn ngữ.",
        pages: 280,
        publisher: "Independently published",
        year: 2020,
        stock: 25,
        rating: 4.6,
        featured: false
    },
    {
        id: 30,
        title: "The Pragmatic Programmer",
        author: "David Thomas, Andrew Hunt",
        categoryId: "cong-nghe",
        price: 190000,
        oldPrice: 230000,
        image: "../img/book_img/book_30.jpg",
        description: "Cuốn sách chia sẻ tư duy, nguyên tắc và kinh nghiệm thực tế giúp lập trình viên làm việc hiệu quả và chuyên nghiệp hơn.",
        pages: 352,
        publisher: "Addison-Wesley Professional",
        year: 2019,
        stock: 20,
        rating: 4.8,
        featured: false
    }
];

// Tin tức
const newsList = [
    {
        id: 1,
        title: "5 cuốn sách nên đọc để phát triển bản thân",
        image: "../img/news-1.jpg",
        summary: "Gợi ý những cuốn sách hữu ích giúp bạn cải thiện tư duy, kỹ năng và thói quen sống.",
        content: "Đọc sách là một trong những cách hiệu quả để phát triển bản thân...",
        date: "2026-04-01",
        author: "HDTTT Bookstore"
    },
    {
        id: 2,
        title: "Lợi ích của việc đọc sách mỗi ngày",
        image: "../img/news-2.jpg",
        summary: "Đọc sách hằng ngày giúp mở rộng kiến thức, giảm căng thẳng và tăng khả năng tập trung.",
        content: "Việc duy trì thói quen đọc sách mỗi ngày mang lại nhiều lợi ích...",
        date: "2026-04-05",
        author: "HDTTT Bookstore"
    }
];

// Người dùng
const users = [
    {
        id: 1,
        fullName: "Đoàn Minh Huy",
        email: "doanminhhuy@gmail.com",
        password: "123456",
        phone: "0967000000",
        address: "TP. Hồ Chí Minh",
        role: "user"
    },
    {
        id: 2,
        fullName: "Admin",
        email: "admin@gmail.com",
        password: "admin123",
        phone: "0911111111",
        address: "TP. Hồ Chí Minh",
        role: "admin"
    }
];

// Trạng thái đơn hàng
const orderStatus = {
    pending: "Chờ xử lý",
    processing: "Đang xử lý",
    completed: "Hoàn thành",
    cancelled: "Đã hủy"
};

// =============================
// Helper functions
// =============================

function formatPrice(price) {
    return price.toLocaleString("vi-VN") + "đ";
}

function getBookById(id) {
    return books.find(function (book) {
        return book.id === Number(id);
    });
}

function getCategoryById(id) {
    return categories.find(function (category) {
        return category.id === id;
    });
}

function getBooksByCategory(categoryId) {
    return books.filter(function (book) {
        return book.categoryId === categoryId;
    });
}

function getFeaturedBooks() {
    return books.filter(function (book) {
        return book.featured === true;
    });
}

function searchBooks(keyword) {
    const text = keyword.toLowerCase().trim();

    return books.filter(function (book) {
        return (
            book.title.toLowerCase().includes(text) ||
            book.author.toLowerCase().includes(text) ||
            book.description.toLowerCase().includes(text)
        );
    });
}

function getBookImage(bookId) {
    return "../img/book_img/book_" + bookId + ".jpg";
}