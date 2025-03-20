
import "chart.js/auto";
import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Form, Row, Table } from "react-bootstrap";
import { Bar, Pie } from "react-chartjs-2";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addExpense, deleteExpense, fetchExpenses, updateExpense } from "../store/financeSlice";
import "../styles/Dashboard.css";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { expenses, loading, error } = useSelector((state) => state.finance);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  useEffect(() => {
    if (user) {
      dispatch(fetchExpenses());
    }
  }, [dispatch, user]);

  const [formData, setFormData] = useState({
    id: null,
    type: "Income",
    category: "",
    amount: "",
    date: new Date().toISOString().split("T")[0],
    description: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [sortType, setSortType] = useState("All");

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const handleSortChange = (e) => {
    setSortType(e.target.value);
    setCurrentPage(1); // Reset to first page on filter change
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (parseFloat(formData.amount) <= 0) {
      alert("Amount must be greater than zero.");
      return;
    }
    if (isEditing) {
      dispatch(updateExpense({ id: formData.id, updatedData: formData }));
      setIsEditing(false);
    } else {
      dispatch(addExpense(formData));
    }

    setFormData({
      id: null,
      type: "Income",
      category: "",
      amount: "",
      date: new Date().toISOString().split("T")[0],
      description: "",
    });
  };

  const handleEdit = (expense) => {
    setFormData(expense);
    setIsEditing(true);
  };

  const handleDelete = (id) => {
    dispatch(deleteExpense(id));
  };

  // Filter and paginate data
  const filteredExpenses = sortType === "All" ? expenses : expenses.filter((item) => item.type === sortType);
  const totalPages = Math.ceil(filteredExpenses.length / itemsPerPage);
  const paginatedExpenses = filteredExpenses.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // Pagination handlers
  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const totalIncome = expenses.filter((item) => item.type === "Income").reduce((acc, curr) => acc + parseFloat(curr.amount), 0);
  const totalExpenses = expenses.filter((item) => item.type === "Expense").reduce((acc, curr) => acc + parseFloat(curr.amount), 0);
  const balance = totalIncome - totalExpenses;

  const pieData = {
    labels: ["Income", "Expenses"],
    datasets: [{ data: [totalIncome, totalExpenses], backgroundColor: ["#1abc9c", "#e74c3c"] }],
  };

  const barData = {
    labels: expenses.map((item) => item.category),
    datasets: [{ label: "Amount", data: expenses.map((item) => item.amount), backgroundColor: expenses.map((item) => (item.type === "Income" ? "#2ecc71" : "#e74c3c")) }],
  };

  return (
    <Container className="dashboard-container">
      <h4 className="welcome-text">Welcome, {user?.firstName} {user?.lastName}..!</h4>
      <h2 className="text-center title">Personal Finance Dashboard</h2>

      {loading && <p>Loading...</p>}
      {error && <p className="error-text">{error}</p>}

      <Card className="summary-card">
        <Card.Body>
          <h4>
            Total Balance: <span className={balance >= 0 ? "positive" : "negative"}>${balance.toFixed(2)}</span>
          </h4>
          <p>Income: <span className="income-text">${totalIncome.toFixed(2)}</span></p>
          <p>Expenses: <span className="expense-text">${totalExpenses.toFixed(2)}</span></p>
        </Card.Body>
      </Card>



      <Form onSubmit={handleSubmit} className="finance-form">
        <Row className="g-3">
          <Col><Form.Select name="type" value={formData.type} onChange={handleChange}><option value="Income">Income</option><option value="Expense">Expense</option></Form.Select></Col>
          <Col><Form.Control type="text" name="category" placeholder="Category" value={formData.category} onChange={handleChange} required /></Col>
          <Col><Form.Control type="number" name="amount" placeholder="Amount" value={formData.amount} onChange={handleChange} required /></Col>
          <Col><Form.Control type="date" name="date" value={formData.date} onChange={handleChange} required /></Col>
          <Col><Form.Control type="text" name="description" placeholder="Description" value={formData.description} onChange={handleChange} required /></Col>
          <Col><Button type="submit" className="btn btn-primary">{isEditing ? "Update" : "Add"}</Button></Col>
        </Row>
      </Form>
      <div className="filter-buttons">
        <Button variant="primary" onClick={() => dispatch(fetchExpenses("monthly"))}>Monthly</Button>
        <Button variant="secondary" onClick={() => dispatch(fetchExpenses("weekly"))} className="ms-2">Weekly</Button>
        <Button variant="success" onClick={() => dispatch(fetchExpenses("yearly"))} className="ms-2">Yearly</Button>
        <Button variant="dark" onClick={() => dispatch(fetchExpenses("all"))} className="ms-2">All</Button>
      </div>
      <div className="sort-toggle">
        <Form.Select onChange={handleSortChange} value={sortType} className="sort-dropdown">
          <option value="All">All Transactions</option>
          <option value="Income">Income</option>
          <option value="Expense">Expense</option>
        </Form.Select>
      </div>
      
      <Table striped bordered hover className="finance-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Type</th>
            <th>Category</th>
            <th>Amount</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedExpenses.map((finance) => (
            <tr key={finance.id}>
              <td>{new Date(finance.date).toLocaleDateString()}</td>
              <td className={finance.type === "Income" ? "income-text" : "expense-text"}>{finance.type}</td>
              <td>{finance.category}</td>
              <td>${finance.amount}</td>
              <td>{finance.description}</td>
              <td>
                <Button variant="warning" size="sm" onClick={() => handleEdit(finance)}>Edit</Button>
                <Button variant="danger" size="sm" className="ms-2" onClick={() => handleDelete(finance.id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <div className="pagination-controls">
        <Button variant="dark" onClick={handlePrevious} disabled={currentPage === 1}>Previous</Button>
        <span className="mx-3">Page {currentPage} of {totalPages}</span>
        <Button variant="dark" onClick={handleNext} disabled={currentPage === totalPages}>Next</Button>
      </div>

      <Row className="charts-container">
        <Col md={6}><h4>Income vs Expenses</h4>
        <div style={{ width: "300px", height: "300px", margin: "0 auto" }}>
        <Pie data={pieData} />
        </div></Col>
        <Col md={6}><h4>Category-wise Breakdown</h4><Bar data={barData} /></Col>
      </Row>
    </Container>
  );
};

export default Dashboard;

