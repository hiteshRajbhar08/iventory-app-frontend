import './ProductForm.scss';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Card from '../../card/Card';

const ProductForm = ({
  product,
  productImage,
  imagePreview,
  description,
  setDescription,
  handleInputChange,
  handleImageChange,
  saveProducts,
}) => {
  return (
    <div className="add-product">
      <Card cardClass={'card'}>
        <form onSubmit={saveProducts}>
          <Card cardClass={'group'}>
            <label>Product Image</label>
            <code className="--color-dark">Supported Formats:jpg,jpeg,png</code>
            <input
              type="file"
              name="image"
              onChange={(e) => handleImageChange(e)}
            />
            {imagePreview !== null ? (
              <div className="image-preview">
                <img src={imagePreview} alt="product" />
              </div>
            ) : (
              <p>No image set for this product</p>
            )}
          </Card>
          <br />
          <label>Product Name:</label>
          <input
            type="text"
            name="name"
            placeholder="product name"
            value={product?.name}
            onChange={handleInputChange}
          />
          <br />
          <label>Product Category:</label>
          <input
            type="text"
            name="category"
            placeholder="product category"
            value={product?.category}
            onChange={handleInputChange}
          />
          <br />
          <label>Product Price:</label>
          <input
            type="text"
            name="price"
            placeholder="product price"
            value={product?.price}
            onChange={handleInputChange}
          />
          <br />
          <label>Product Quantity:</label>
          <input
            type="text"
            name="quantity"
            placeholder="product quantity"
            value={product?.quantity}
            onChange={handleInputChange}
          />
          <br />
          <label>Product Description:</label>
          <ReactQuill
            theme="snow"
            value={description}
            onChange={setDescription}
            modules={ProductForm.modules}
            formats={ProductForm.formats}
          />
          <div className="--my">
            <button type="submit" className="--btn --btn-primary">
              Save Products
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
};

ProductForm.modules = {
  toolbar: [
    [{ header: '1' }, { header: '2' }, { font: [] }],
    [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ align: [] }],
    [{ color: [] }, { background: [] }],
    [
      { list: 'ordered' },
      { list: 'bullet' },
      { indent: '-1' },
      { indent: '+1' },
    ],
    ['clean'],
  ],
};
ProductForm.formats = [
  'header',
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'color',
  'background',
  'list',
  'bullet',
  'indent',
  'link',
  'video',
  'image',
  'code-block',
  'align',
];

export default ProductForm;
