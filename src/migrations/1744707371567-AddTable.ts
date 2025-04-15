import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddTable1744707371567 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "note" (
                "uuid" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "title" character varying(255) NOT NULL,
                "content" text NOT NULL,
                "is_deleted" boolean NOT NULL DEFAULT false,
                "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
                "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
                CONSTRAINT "PK_note_uuid" PRIMARY KEY ("uuid")
            )
        `);

    // Добавляем триггер для автоматического обновления updated_at
    await queryRunner.query(`
            CREATE OR REPLACE FUNCTION update_updated_at_column()
            RETURNS TRIGGER AS $$
            BEGIN
                NEW.updated_at = NOW();
                RETURN NEW;
            END;
            $$ LANGUAGE plpgsql
        `);

    await queryRunner.query(`
            CREATE TRIGGER update_note_updated_at
            BEFORE UPDATE ON "note"
            FOR EACH ROW
            EXECUTE FUNCTION update_updated_at_column()
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP TRIGGER IF EXISTS update_note_updated_at ON "note"`,
    );
    await queryRunner.query(
      `DROP FUNCTION IF EXISTS update_updated_at_column()`,
    );
    await queryRunner.query(`DROP TABLE IF EXISTS "note"`);
  }
}
