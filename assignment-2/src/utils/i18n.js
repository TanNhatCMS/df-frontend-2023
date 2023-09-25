import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
    resources: {
        en: {
            translation: {
                language: "English",
                titleSite: "BookStore",
                addbook: "Add Book",
                create: "Create",
                cancel: "Cancel",
                searchbook: "Search Book",
                namePlaceholder: "Enter Name Book",
                authorPlaceholder: "Enter Author Book",
                modalTitle: "Add New Book",
                name: "Name",
                edit: "Edit",
                delete: "Delete",
                author: "Author",
                topic: "Topic",
                action: "Action",
                confirm: "Confirm",
                close: "Close",
                id: "#",
                selectTopic: "Select Topic",
                editBook: "Edit Book",
                saveBook: "Save Book",
                deleteBook: "Delete Book",
                deleteBookConfirmation: "Do you want to delete ",
            },
        },
        vi: {
            translation: {
                language: "Tiếng Việt",
                titleSite: "Cửa hàng sách",
                addbook: "Thêm Sách",
                create: "Thêm Sách",
                cancel: "Hủy",
                searchbook: "Tìm Sách",
                namePlaceholder: "Nhập tên sách",
                authorPlaceholder: "Nhập tác giả",
                modalTitle: "Thêm Sách Mới",
                name: "Tên Sách",
                edit: "Sửa",
                delete: "Xoá",
                author: "Tác giả",
                topic: "Chủ đề",
                action: "Hành động",
                confirm: "Xác nhận",
                close: "Đóng",
                id: "STT",
                selectTopic: "Chọn chủ đề",
                editBook: "Sửa thông tin sách",
                saveBook: "Lưu",
                deleteBook: "Xoá sách",
                deleteBookConfirmation: "Bạn có muốn xóa ",
            },
        },
    },
    lng: 'en', // Ngôn ngữ mặc định
    fallbackLng: 'en', // Ngôn ngữ dự phòng
});

export default i18n;