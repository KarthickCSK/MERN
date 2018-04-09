import Register from './register.jsx';

//Export the component, so that by including the Folder, by default the component is exported
//ES5 export
//module.exports =Register ;

//ES6 export
export default Register;

//If your functional module have multiple components and more than one of them have
// to be exported, follow the object notation to export them

/*module.exports =  {
	component1: component1,
	component2: component2,
	component3: component3,
	..
	..
	componentN: componentN,
}*/
