import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddHoursColumn1707550201394 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('users', [
      new TableColumn({
        name: 'created_at',
        type: 'timestamp with time zone',
        default: 'now()',
      }),
      new TableColumn({
        name: 'updated_at',
        type: 'timestamp with time zone',
        default: 'now()',
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('users', 'created_at');
    await queryRunner.dropColumn('users', 'updated_at');
  }
}
