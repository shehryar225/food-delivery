import { MigrationInterface, QueryRunner } from "typeorm";

export class Customer1729766493471 implements MigrationInterface {
    name = 'Customer1729766493471'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "chat" RENAME COLUMN "message" TO "content"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "chat" RENAME COLUMN "content" TO "message"`);
    }

}
