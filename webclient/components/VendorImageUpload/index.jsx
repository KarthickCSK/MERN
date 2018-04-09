import ImageUpload from './imageupload.jsx';
import CategoryImageUpload from './categoryimageupload.jsx';
import SubCategoryImageUpload from './subcategoryimageupload.jsx';

//Export the component, so that by including the Folder, by default the component is exported
//ES5 export
//module.exports = Sample;

//ES6 export
//export default ImageUpload;

//If your functional module have multiple components and more than one of them have
// to be exported, follow the object notation to export them
module.exports = {
    ImageUpload: ImageUpload,
    CategoryImageUpload: CategoryImageUpload,
  SubCategoryImageUpload: SubCategoryImageUpload
};
