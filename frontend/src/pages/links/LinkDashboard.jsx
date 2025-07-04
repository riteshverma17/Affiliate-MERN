import IconButton from '@mui/material/IconButton';
import { DataGrid } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { serverEndpoint } from "../../config/config";
import { Modal } from 'react-bootstrap';
import { usePermission } from '../../rbac/permissions';

function LinkDashboard() {
    const [errors, setErrors] = useState({});
    const [linksData, setLinksData] = useState([]);
    const [formData, setFormData] = useState({
        campaignTitle: '',
        originalUrl: '',
        category: ''
    });
    const [showModal, setShowModal] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [loading, setLoading] = useState(false);
    const permission = usePermission();

    const handleModalShow = (isEdit, data = {}) => {
        if (isEdit) {
            setFormData({
                id: data._id,
                campaignTitle: data.campaignTitle,
                originalUrl: data.originalUrl,
                category: data.category
            });
        } else {
            setFormData({
                campaignTitle: '',
                originalUrl: '',
                category: ''
            });
        }
        setErrors({});
        setIsEdit(isEdit);
        setShowModal(true);
    };

    const handleModalClose = () => {
        setShowModal(false);
        setErrors({});
    };

    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const handleDeleteModalShow = (linkId) => {
        setFormData({ id: linkId });
        setShowDeleteModal(true);
    };

    const handleDeleteModalClose = () => {
        setShowDeleteModal(false);
        setErrors({});
    };

    const handleDeleteSubmit = async () => {
        try {
            setLoading(true);
            await axios.delete(`${serverEndpoint}/links/${formData.id}`, {
                withCredentials: true
            });
            setFormData({ campaignTitle: '', originalUrl: '', category: '' });
            fetchLinks();
        } catch (error) {
            setErrors({ message: 'Something went wrong, please try again' });
        } finally {
            setLoading(false);
            handleDeleteModalClose();
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const isValidUrl = (url) => {
        try {
            new URL(url);
            return true;
        } catch (_) {
            return false;
        }
    };

    const validate = () => {
        let newErrors = {};
        let isValid = true;

        if (!formData.campaignTitle.trim()) {
            newErrors.campaignTitle = "Campaign Title is mandatory";
            isValid = false;
        }

        if (!formData.originalUrl.trim()) {
            newErrors.originalUrl = "Original URL is mandatory";
            isValid = false;
        } else if (!isValidUrl(formData.originalUrl)) {
            newErrors.originalUrl = "Please enter a valid URL";
            isValid = false;
        }

        if (!formData.category.trim()) {
            newErrors.category = "Category is mandatory";
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (validate()) {
            const body = {
                campaign_title: formData.campaignTitle,
                original_url: formData.originalUrl,
                category: formData.category
            };
            try {
                setLoading(true);
                if (isEdit) {
                    await axios.put(
                        `${serverEndpoint}/links/${formData.id}`,
                        body, { withCredentials: true });
                } else {
                    await axios.post(
                        `${serverEndpoint}/links`,
                        body, { withCredentials: true });
                }

                setFormData({
                    campaignTitle: '',
                    originalUrl: '',
                    category: ''
                });
                fetchLinks();
            } catch (error) {
                setErrors({ message: 'Something went wrong, please try again' });
            } finally {
                setLoading(false);
                handleModalClose();
            }
        }
    };

    const fetchLinks = async () => {
        try {
            const response = await axios.get(`${serverEndpoint}/links`, {
                withCredentials: true
            });
            setLinksData(response.data.data);
        } catch (error) {
            console.log(error);
            setErrors({ message: 'Unable to fetch links at the moment, please try again' });
        }
    };

    useEffect(() => {
        fetchLinks();
    }, []);

    const columns = [
        { field: 'campaignTitle', headerName: 'Campaign', flex: 2 },
        {
            field: 'originalUrl', headerName: 'URL', flex: 3, renderCell: (params) => (
                <a
                    href={`${serverEndpoint}/links/r/${params.row._id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    {params.row.originalUrl}
                </a>
            ),
        },
        { field: 'category', headerName: 'Category', flex: 2 },
        { field: 'clickCount', headerName: 'Clicks', flex: 1 },
        {
            field: 'action', headerName: 'Action', flex: 1, renderCell: (params) => (
                <>
                    {permission.canEditLink && (
                        <IconButton aria-label="Edit">
                            <EditIcon sx={{ color: '#0d47a1' }} onClick={() => handleModalShow(true, params.row)} />
                        </IconButton>
                    )}

                    {permission.canDeleteLink && (
                        <IconButton aria-label="Delete">
                            <DeleteIcon sx={{ color: '#b71c1c' }} onClick={() => handleDeleteModalShow(params.row._id)} />
                        </IconButton>
                    )}
                </>
            )
        },
    ];

    return (
        <div className="container py-4">
            <div className="d-flex justify-content-between mb-3">
                <h2 style={{ color: '#008ba3' }}>Manage Affiliate Links</h2>
                {permission.canCreateLink && (
                    <button
                        className='btn btn-xl'
                        style={{ backgroundColor: '#008ba3', color: 'white' }}
                        onClick={() => handleModalShow(false)}
                    >
                        Add Links
                    </button>
                )}
            </div>

            {errors.message && (
                <div className="alert alert-danger" role="alert">
                    {errors.message}
                </div>
            )}

            <div style={{ height: 500, width: '100%' }}>
                <DataGrid
                    getRowId={(row) => row._id}
                    rows={linksData}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: { pageSize: 20, page: 0 },
                        },
                    }}
                    pageSizeOptions={[20, 50, 100]}
                    disableRowSelectionOnClick
                    sx={{
                        fontFamily: 'inherit',
                        
                        
                        border: '1px solid black',
                        '& .MuiDataGrid-columnHeaders': {
                            
                            color: 'black',
                            fontWeight: 'bold',
                            border: '1px solid black'

                        },
                        '& .MuiDataGrid-row:hover': {
                            
                        },
                        '& .MuiDataGrid-cell': {
                            borderBottom: '1px solid white',
                        },
                        '& .MuiDataGrid-footerContainer': {
                            backgroundColor: '#00bcd4',
                            color: 'black',
                            
                        },
                    }}
                />
            </div>

            {/* Add/Edit Modal */}
            <Modal show={showModal} onHide={handleModalClose}>
                <Modal.Header
                    closeButton
                    style={{ backgroundColor: '#00bcd4', color: 'white' }}
                >
                    <Modal.Title>{isEdit ? 'Edit Link' : 'Add Link'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="campaignTitle" className="form-label">Campaign Title</label>
                            <input
                                type="text"
                                className={`form-control ${errors.campaignTitle ? 'is-invalid' : ''}`}
                                id="campaignTitle"
                                name="campaignTitle"
                                value={formData.campaignTitle}
                                onChange={handleChange}
                            />
                            {errors.campaignTitle && (
                                <div className="invalid-feedback">{errors.campaignTitle}</div>
                            )}
                        </div>

                        <div className="mb-3">
                            <label htmlFor="originalUrl" className="form-label">Original URL</label>
                            <input
                                type="text"
                                className={`form-control ${errors.originalUrl ? 'is-invalid' : ''}`}
                                id="originalUrl"
                                name="originalUrl"
                                value={formData.originalUrl}
                                onChange={handleChange}
                            />
                            {errors.originalUrl && (
                                <div className="invalid-feedback">{errors.originalUrl}</div>
                            )}
                        </div>

                        <div className="mb-3">
                            <label htmlFor="category" className="form-label">Category</label>
                            <input
                                type="text"
                                className={`form-control ${errors.category ? 'is-invalid' : ''}`}
                                id="category"
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                            />
                            {errors.category && (
                                <div className="invalid-feedback">{errors.category}</div>
                            )}
                        </div>

                        <div className="d-grid">
                            <button
                                type="submit"
                                className="btn"
                                style={{ backgroundColor: '#00bcd4', color: 'white' }}
                                disabled={loading}
                            >
                                {loading ? 'Submitting...' : 'Submit'}
                            </button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>

            {/* Delete Confirmation Modal */}
            <Modal show={showDeleteModal} onHide={handleDeleteModalClose}>
                <Modal.Header
                    closeButton
                    style={{ backgroundColor: '#00bcd4', color: 'white' }}
                >
                    <Modal.Title>Confirm Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete this link?
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-secondary" onClick={handleDeleteModalClose}>
                        Cancel
                    </button>
                    <button
                        className="btn"
                        style={{ backgroundColor: '#00bcd4', color: 'white' }}
                        onClick={handleDeleteSubmit}
                        disabled={loading}
                    >
                        {loading ? 'Deleting...' : 'Delete'}
                    </button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default LinkDashboard;
