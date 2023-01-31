import CarImage from './CarImage';

describe('CarImage Model', () => {
  let carImage: CarImage;
  it('should be able to create a new carImage object with as little information as possible', () => {
    carImage = new CarImage({
      carId: 'car-id',
      image: 'image-name',
    });

    expect(carImage).toHaveProperty('id');
    expect(carImage).toHaveProperty('createdAt');
  });

  it('should be able to create a new carImage object with full information', () => {
    const newCarImage = new CarImage({
      carId: carImage.carId,
      image: carImage.image,
      id: carImage.id,
      createdAt: carImage.createdAt,
    });

    expect(newCarImage).toMatchObject(carImage);
  });
});
