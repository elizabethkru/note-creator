import { MigrationInterface, QueryRunner } from 'typeorm';

export class Note1712345678901 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE note (
        uuid uuid PRIMARY KEY,
        title varchar(255) NOT NULL,
        content text NOT NULL,
        is_deleted boolean DEFAULT false,
        created_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE note;`);
  }
}
