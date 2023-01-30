import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';

@Entity('car_image')
class CarImage {
  @PrimaryColumn()
  id: string;

  @Column()
  image: string;

  @Column({ name: 'car_id' })
  carId: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}

export default CarImage;
