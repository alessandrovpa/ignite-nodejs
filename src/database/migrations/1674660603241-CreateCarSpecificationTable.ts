import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateCarSpecificationTable1674660603241
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'car_specification',
        columns: [
          {
            name: 'car_id',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'specification_id',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
        foreignKeys: [
          {
            name: 'carSpecification_car',
            columnNames: ['car_id'],
            referencedTableName: 'car',
            referencedColumnNames: ['id'],
            onDelete: 'SET NULL',
            onUpdate: 'SET NULL',
          },
          {
            name: 'carSpecification_specification',
            columnNames: ['specification_id'],
            referencedTableName: 'specification',
            referencedColumnNames: ['id'],
            onDelete: 'SET NULL',
            onUpdate: 'SET NULL',
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('car_specification');
  }
}
