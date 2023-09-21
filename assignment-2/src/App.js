import "./App.css";
import { useState, useEffect } from "react";
import {
  ConfigProvider,
  theme,
  Button,
  Table,
  Typography,
  Space,
  Switch,
  Avatar,
  Input,
  Modal,
  Select,
  Form,
  message,
  Popconfirm,
  Pagination,
} from "antd";
import { UserOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

function App() {
  const { defaultAlgorithm, darkAlgorithm } = theme;
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();

  const [isDarkMode, setIsDarkMode] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [booksFiltered, setBooksFiltered] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;


  useEffect(() => {
    setBooks([
      {
        id: 1,
        name: 'Refactoring',
        author: 'Martin Fowler',
        topic: 'Programming',
      },
      {
        id: 2,
        name: 'Design Data-Intensive Applications',
        author: 'Martin Kleppman',
        topic: 'Database',
      },
      {
        id: 3,
        name: 'The Phoenix Project',
        author: 'Gene Kim',
        topic: 'Devops',
      },
      {
        id: 4,
        name: 'JavaScript: The Good Parts',
        author: 'Douglas Crockford',
        topic: 'Frontend',
      },
      {
        id: 5,
        name: 'Node.js Design Patterns',
        author: 'Mario Casciaro',
        topic: 'Backend',
      },
      {
        id: 6,
        name: 'Clean Code: A Handbook of Agile Software Craftsmanship',
        author: 'Robert C. Martin',
        topic: 'Programming',
      },
      {
        id: 7,
        name: 'Database Systems: The Complete Book',
        author: 'Hector Garcia-Molina',
        topic: 'Database',
      },
      {
        id: 8,
        name: 'Continuous Delivery: Reliable Software Releases through Build, Test, and Deployment Automation',
        author: 'Jez Humble and David Farley',
        topic: 'Devops',
      },
      {
        id: 9,
        name: 'Eloquent JavaScript',
        author: 'Marijn Haverbeke',
        topic: 'Frontend',
      },
      {
        id: 10,
        name: 'Python Crash Course',
        author: 'Eric Matthes',
        topic: 'Programming',
      },
      {
        id: 11,
        name: 'Introduction to the Theory of Computation',
        author: 'Michael Sipser',
        topic: 'Programming',
      },
      {
        id: 12,
        name: 'MongoDB: The Definitive Guide',
        author: 'Kristina Chodorow',
        topic: 'Database',
      },
      {
        id: 13,
        name: 'Kubernetes Up and Running',
        author: 'Kelsey Hightower',
        topic: 'Devops',
      },
      {
        id: 14,
        name: 'React Up and Running',
        author: 'Stoyan Stefanov',
        topic: 'Frontend',
      },
      {
        id: 15,
        name: 'Node.js in Action',
        author: 'Mike Cantelon',
        topic: 'Backend',
      },
      {
        id: 16,
        name: 'Agile Estimating and Planning',
        author: 'Mike Cohn',
        topic: 'Devops',
      },
      {
        id: 17,
        name: 'Head First Java',
        author: 'Kathy Sierra and Bert Bates',
        topic: 'Programming',
      },
      {
        id: 18,
        name: 'Learning SQL',
        author: 'Alan Beaulieu',
        topic: 'Database',
      },
      {
        id: 19,
        name: 'The Pragmatic Programmer',
        author: 'Andrew Hunt and David Thomas',
        topic: 'Programming',
      },
      {
        id: 20,
        name: 'Docker Deep Dive',
        author: 'Nigel Poulton',
        topic: 'Devops',
      }
    ]);
  }, []);

  useEffect(() => {
    localStorage.setItem("books", JSON.stringify(books));
  }, [books]);

  const topics = [
    "Programming",
    "Database",
    "Devops",
    "Frontend",
    "Backend"
  ];

  const tableColumns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Author",
      dataIndex: "author",
      key: "author",
    },
    {
      title: "Topic",
      dataIndex: "topic",
      key: "topic",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_, record) => (
        <Popconfirm
          title='Delete book'
          description='Are you sure to delete this book?'
          onConfirm={() => handleDeleteBook(record.name)}
          okText='Yes'
          cancelText='No'
        >
          <Button type='text' danger>
            Delete
          </Button>
        </Popconfirm>
      ),
    },
  ];

  const tableData = books.map((book, i) => {
    return {
      key: i,
      name: book.name,
      author: book.author,
      topic: book.topic,
      action: "Delete",
    };
  });

  const handleSwitchTheme = () => {
    setIsDarkMode((previousValue) => !previousValue);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleAddBook = (newBook) => {
    setBooks((oldBooks) => [...oldBooks, newBook]);
  };

  const handleDeleteBook = (name) => {
    setBooks((oldBooks) => oldBooks.filter((book) => book.name !== name));
  };

  const handleSuccessMessage = (action) => {
    const content =
      action === "create" ? "Create" : action === "delete" ? "Delete" : "";
    messageApi.open({
      type: "success",
      content: `${content} success`,
    });
  };

  const handleSearch = () => {
    const reg = new RegExp(searchValue, "gi");

    const search = books.filter((book) => book.name.search(reg) > -1);
    setBooksFiltered(
      search.map((item) => {
        return { label: item.name, value: item.name };
      })
    );
  };
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const visibleBooks = books.slice(startIndex, endIndex);
  return (
    <ConfigProvider
      theme={{
        algorithm: isDarkMode ? darkAlgorithm : defaultAlgorithm,
      }}
    >
      {contextHolder}
      <Space
        style={{
          width: "100%",
          padding: "6px 12px",
          justifyContent: "space-between",
          borderBottom: `1px solid ${isDarkMode ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.15)"
            }`,
          backgroundColor: isDarkMode ? "rgb(36,37,38)" : "white",
        }}
      >
        <Space>
          <Title
            style={{
              fontSize: "18px",
              fontWeight: 700,
              margin: 0,
            }}
          >
            Bookstore
          </Title>
        </Space>
        <Space>
          <Switch checked={isDarkMode} onChange={handleSwitchTheme} />
          <Text
            style={{ fontSize: "14px", fontWeight: 500, marginRight: "7px" }}
          >
            {isDarkMode ? "Dark" : "Light"} mode
          </Text>
          <Avatar icon={<UserOutlined />} />
          <Text style={{ fontSize: "14px", fontWeight: 500 }}>
            TânNhậtCMS
          </Text>
        </Space>
      </Space>
      <Space.Compact
        direction='vertical'
        style={{
          width: "100%",
          minHeight: "calc(100vh - 45px)",
          padding: "30px 15px 0 15px",
          backgroundColor: isDarkMode ? "rgb(36,37,38)" : "white",
        }}
      >
        <Space
          style={{
            width: "100%",
            justifyContent: "space-between",
            marginBottom: "20px",
          }}
        >
          <Select
            showSearch
            onChange={(value) => setSearchValue(value)}
            labelInValue
            options={booksFiltered}
            notFoundContent='No book match the search value'
            onSearch={handleSearch}
            placeholder='Search books'
            style={{ minWidth: "200px" }}
          />
          <Button
            type='primary'
            danger
            onClick={() => {
              setOpenModal(true);
            }}
          >
            Add book
          </Button>
        </Space>
        <Table dataSource={visibleBooks} columns={tableColumns} bordered />
        <Pagination
          current={currentPage}
          total={books.length}
          pageSize={pageSize}
          onChange={handlePageChange}
        />
      </Space.Compact>
      <Modal
        title='Add book'
        open={openModal}
        okText='Create'
        cancelText='Cancel'
        onOk={() => {
          form
            .validateFields()
            .then((values) => {
              form.resetFields();
              handleAddBook(values);
            })
            .catch((info) => {
              console.log("Validate Failed:", info);
            });
          handleSuccessMessage("create");
          handleCloseModal();
        }}
        onCancel={handleCloseModal}
      >
        <Form
          form={form}
          layout='vertical'
          name='add-book-form'
          initialValues={{ topic: "Programming" }}
        >
          <Form.Item
            name='name'
            label='Name'
            rules={[
              { required: true, message: "Please input the name of book!" },
            ]}
          >
            <Input placeholder='Book name' />
          </Form.Item>
          <Form.Item
            name='author'
            label='Author'
            rules={[
              { required: true, message: "Please input the author of book!" },
            ]}
          >
            <Input placeholder='Book author' />
          </Form.Item>
          <Form.Item name='topic' label='Topic'>
            <Select
              options={topics.map((topic) => {
                return { value: topic, label: topic };
              })}
            />
          </Form.Item>
        </Form>
      </Modal>
    </ConfigProvider>
  );
}

export default App;
