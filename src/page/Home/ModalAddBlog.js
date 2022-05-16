
import React,{useState,useEffect} from 'react';
import {  useDispatch, useSelector } from 'react-redux';
import {Button, Modal, ModalFooter,ModalHeader, ModalBody} from "reactstrap";
import { Form,FormGroup,Input,Label} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";

function ModalAddBlog() {
    const [modal, setModal] = useState(false);
    const togglePopup = () => setModal(!modal);
    const [ titleBlog, setTitleBlog ] = useState('');
    const [ contentBlog, setContentBlog ] = useState('');

    // Handling the title change
    const handleTitle = (e) => {
        setTitleBlog(e.target.value);
    };
   
    // Handling the content change
    const handleContent = (e) => {
        setContentBlog(e.target.value);
    };
    // Handling add a blog
    const addBlog  = async () => {
        await axios.post('https://api-placeholder.herokuapp.com/api/v2/blogs',{
            contentType : 'application/json' ,
            blog: {
                title : titleBlog,
                content : contentBlog,
            }
        })
        .then (res => {
            setTitleBlog('');
            setContentBlog('');
            setModal(false);
        })
    }
    return(
        <div className="">
            <div className="add-blog">
                <button onClick={togglePopup}>Add Blog</button>
            </div>
            <Modal isOpen={modal} toggle={togglePopup}>
                <ModalHeader >Add Blog</ModalHeader>
                <ModalBody>
                    <Form className="form">
                        <FormGroup>
                            <Label for="title-blog">Title</Label>
                            <Input
                            onChange={handleTitle}
                            type="text"
                            name="title"
                            id="title-blog"
                            placeholder="Enter blog's title"
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="content-blog">Content</Label>
                            <Input
                            onChange={handleContent}
                            type="textarea"
                            name="content"
                            id="content-blog"
                            placeholder="Enter blog's content"
                            />
                        </FormGroup>
                       {/* <Button>Submit</Button> */}
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={togglePopup}>Cancel</Button>
                    <Button color="success" onClick={addBlog}>Done</Button>
                </ModalFooter>
            </Modal>
        </div>
        
    )
}
export default ModalAddBlog;
