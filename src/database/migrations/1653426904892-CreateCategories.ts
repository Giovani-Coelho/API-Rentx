import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateCategories1653426904892 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // criar tabela
    await queryRunner.createTable(
      new Table({
        // nome da tabela
        name: 'categories',
        columns: [
          // colunas da tabela
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'description',
            type: 'varchar',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('categories')
  }
}
