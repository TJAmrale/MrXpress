import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosClient from "../axios-client";
import { Button, Container, Form } from "react-bootstrap";
import NavBarAdmin from "../components/NavBarAdmin";
import Loading from "../components/Loading";



function ManageItemForm() {
    const { item_id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState();
    const [item, setItem] = useState({
        item_id: null,
        item_type: "",
        item_name: "",
        description: "",
    });

    useEffect(() => {
        if (item_id) {
            setLoading(true);
            axiosClient
                .get(`/item/${item_id}`)
                .then((response) => {
                    setLoading(false);
                    
                    setItem(response.data);
                })
                .catch(() => {
                    setLoading(false);
                });
        }
    }, [item_id]);

    const onSubmit = (e) => {
        e.preventDefault();
        if (item.item_id) {
            axiosClient
                .put(`/item/${item.item_id}`, item)
                .then(() => {
                    navigate("/app/admin/item");
                })
                .catch((err) => {
                    const response = err.response;
                    if (response && response.status === 422) {
                        setErrors(response.data.errors);
                    }
                });
        } else {
            axiosClient
                .post("/item", item)
                .then(() => {
                    navigate("/app/admin/item");
                })
                .catch((err) => {
                    const response = err.response;
                    if (response && response.status === 422) {
                        setErrors(response.data.errors);
                    }
                });
        }
    };

    return (
        <>
            <NavBarAdmin />
            <section className="w-50">
                {item.item_id && <h1>Update Item: {item.item_id}</h1>}
                {!item.item_id && <h1>New Item</h1>}

                <div>
                    {loading && <Loading />}
                    {errors && (
                        <div className="alert">
                            {Object.keys(errors).map((key) => (
                                <span key={key}>{errors[key][0]} </span>
                            ))}
                        </div>
                    )}

                    {!loading && (
                        <Form onSubmit={onSubmit}>
                            <Form.Group className="mt-3" controlId="formBasicItemType">
                                <Form.Label>Item Type</Form.Label>
                                <Form.Select 
                                    value={item.item_type} 
                                    onChange={(e) => setItem({ ...item, item_type: e.target.value })}
                                >
                                    <option value="" disabled>Select Item Type</option>
                                    <option value="PART">PART</option>
                                    <option value="ACCESSORY">ACCESSORY</option>
                                </Form.Select>
                            </Form.Group>                            
                            <Form.Group className="mt-3" controlId="formBasicItemName">
                                <Form.Label>Item Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={item.item_name}
                                    onChange={(e) => setItem({ ...item, item_name: e.target.value })}
                                />
                            </Form.Group>

                            <Form.Group className="mt-3" controlId="formBasicDescription">
                                <Form.Label>Description</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={item.description}
                                    onChange={(e) => setItem({ ...item, description: e.target.value })}
                                />
                            </Form.Group>



                            <Button className="mt-4 w-25 full-width" variant="primary" type="submit">
                                Save
                            </Button>
                        </Form>
                    )}
                </div>
            </section>
        </>
    );
}

export default ManageItemForm;
