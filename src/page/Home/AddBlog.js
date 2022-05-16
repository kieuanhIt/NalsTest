
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

     // States for checking the errors
     const [submitted, setSubmitted] = useState(false);
     const [error, setError] = useState(false);
     const [txtError, setTxtError] = useState(false);
     const [errorDetail, setErrorDetail] = useState(0);
    // Handling the title change
    const handleTitle = (e) => {
        setTitleBlog(e.target.value);
        setSubmitted(false);
    };
   
    // Handling the content change
    const handleContent = (e) => {
        setContentBlog(e.target.value);
        setSubmitted(false);
    };
    // Handling add a blog
    const submitAddBlog  = async () => {
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
    const addBlog  = async (e) => {
        e.preventDefault();
        if (titleBlog === '' || contentBlog === '' ) {
            setError(true);              
        } 
        else{
            setSubmitted(true);
            setError(false);
            submitAddBlog()
        }
        
    }
    // Showing error message if error is true
    const errorMessage = () => {
        return (
          <div
              className="error"
              style={{
                  display: error ? '' : 'none',
              }}>
              <h1>Please enter all the fields</h1>
          </div>
        );
      };
    return(
        <div className="">
            <div className="add-blog">
                <button onClick={togglePopup}>Add Blog</button>
            </div>
            <Modal isOpen={modal} toggle={togglePopup}>
                <ModalHeader >Add Blog</ModalHeader>
                <ModalBody>
                    <div className="messages-error">
                        {errorMessage()}
                    </div>
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
