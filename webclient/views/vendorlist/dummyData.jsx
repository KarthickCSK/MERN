export default function getVendorList() {
  const details = [
    {
      name: 'ABC Electronics',
      brand: 'APPLE',
      discount: '40% OFF',
      address: 'Shop No 10, 11th Main, Near-Cool Joint, Jayanagar 4th Block, Bengaluru, Karnataka 560011, India',
      ratings: '3.5',
      vendorimage: './vendor1.jpg'
    },
    {
      name: 'YZ Sarees',
      discount: '50% OFF',
      brand: 'NIKE',
      address: ' Shop No 2014, HAL 2nd Stage, 100 Feet Rd, Indira Nagar, Bengaluru, Karnataka 560008, India',
      ratings: '5',
      vendorimage: './vendor2.jpg'
    },
    {
      name: 'NO Silks',
      discount: '70% OFF',
      brand: 'REEBOK',
      address: '2008,Near Vodafone, 100 Feet Rd, HAL 2nd Stage, Indiranagar, Bengaluru, Karnataka 560008, India',
      ratings: '1',
      vendorimage: './vendor3.jpg'
    }
  ];
  return details;
}
