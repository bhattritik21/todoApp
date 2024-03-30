"use client"
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addTodo, filterTodos } from '../redux/todoActions';
import TodoList from './TodoList';

class TodoApp extends Component {
    state = {
        text: '',
        desc:'',
    };

    handleChangeTxt = e => {
        this.setState({ text: e.target.value });
    };
    handleChangeDesc = e => {
        this.setState({ desc: e.target.value });
    };

    handleSubmit = e => {
        e.preventDefault();
        if (this.state.text.trim() !== '') {
            this.props.addTodo(this.state.text,this.state.desc);
            this.setState({ text: '',desc:'' });
        }
    };

    render() {
        return (
            <div className='main h-screen flex w-full justify-center'>
                <div className='todoApp w-2/5 p-40 bg-regal-blue'>
                    <h1 className='text-text font-medium text-2xl'>Add Task</h1>
                    <form onSubmit={this.handleSubmit} className='flex flex-col mt-8'>
                        <label className='text-base'>Task Title</label>
                        <input
                            className='border-bc border-2 rounded-lg px-4 py-3 mt-2'
                            type="text"
                            value={this.state.text}
                            onChange={this.handleChangeTxt}
                            placeholder="Enter task title"
                        />
                        <label className='text-base mt-5'>Task Description</label>
                         <textarea
                          className='border-bc border-2 rounded-lg px-4 py-3 mt-2'
                            type="text"
                            rows="4"
                            value={this.state.desc}
                            onChange={this.handleChangeDesc}
                            placeholder="Enter discription"
                        />
                        <button className='bg-text text-white mt-10 p-3 rounded' type="submit">Add Task</button>
                    </form>
                </div>
                <TodoList />
            </div>

        );
    }
}

const mapStateToProps = state => ({
    todos: state.todos
});

export default connect(mapStateToProps, { addTodo, filterTodos })(TodoApp);
