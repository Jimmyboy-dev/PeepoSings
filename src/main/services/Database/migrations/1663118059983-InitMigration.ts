import { MigrationInterface, QueryRunner } from "typeorm";

export class InitMigration1663118059983 implements MigrationInterface {
    name = 'InitMigration1663118059983'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "song_path_unique"`);
        await queryRunner.query(`CREATE TABLE "song_mood_mood" ("songId" integer NOT NULL, "moodId" integer NOT NULL, PRIMARY KEY ("songId", "moodId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_8f9e3ddfe591e039e6d1c76112" ON "song_mood_mood" ("songId") `);
        await queryRunner.query(`CREATE INDEX "IDX_929b5a2c93bd87762cbf5228b1" ON "song_mood_mood" ("moodId") `);
        await queryRunner.query(`CREATE TABLE "temporary_song" ("title" text, "path" text, "artist" text, "duration" integer, "album" text, "favorite" integer DEFAULT ('false'), "in" integer, "out" integer, "metadata" text, "id" integer PRIMARY KEY NOT NULL, "lastScanned" datetime, "muid" text, "position" integer, "thumbnail" text)`);
        await queryRunner.query(`INSERT INTO "temporary_song"("title", "path", "artist", "duration", "album", "favorite", "in", "out", "metadata", "id", "lastScanned", "muid", "position", "thumbnail") SELECT "title", "path", "artist", "duration", "album", "favorite", "in", "out", "metadata", "id", "lastScanned", "muid", "position", "thumbnail" FROM "song"`);
        await queryRunner.query(`DROP TABLE "song"`);
        await queryRunner.query(`ALTER TABLE "temporary_song" RENAME TO "song"`);
        await queryRunner.query(`CREATE TABLE "temporary_song" ("title" varchar NOT NULL, "path" varchar NOT NULL, "artist" varchar NOT NULL, "duration" integer NOT NULL, "album" varchar, "favorite" boolean NOT NULL DEFAULT (0), "in" integer NOT NULL DEFAULT (0), "out" integer NOT NULL, "metadata" text NOT NULL, "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "lastScanned" integer, "muid" varchar, "position" integer NOT NULL DEFAULT (0), "thumbnail" varchar NOT NULL, CONSTRAINT "UQ_2b44752ae42562163c4b75b5a2d" UNIQUE ("path"), CONSTRAINT "UQ_34d9d762ce9374f49162b0816a6" UNIQUE ("muid"))`);
        await queryRunner.query(`INSERT INTO "temporary_song"("title", "path", "artist", "duration", "album", "favorite", "in", "out", "metadata", "id", "lastScanned", "muid", "position", "thumbnail") SELECT "title", "path", "artist", "duration", "album", "favorite", "in", "out", "metadata", "id", "lastScanned", "muid", "position", "thumbnail" FROM "song"`);
        await queryRunner.query(`DROP TABLE "song"`);
        await queryRunner.query(`ALTER TABLE "temporary_song" RENAME TO "song"`);
        await queryRunner.query(`CREATE TABLE "temporary_mood" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "color" varchar(7) NOT NULL DEFAULT ('#77ee77'), "icon" varchar NOT NULL DEFAULT ('fas:music-note'))`);
        await queryRunner.query(`INSERT INTO "temporary_mood"("id", "name", "color", "icon") SELECT "id", "name", "color", "icon" FROM "mood"`);
        await queryRunner.query(`DROP TABLE "mood"`);
        await queryRunner.query(`ALTER TABLE "temporary_mood" RENAME TO "mood"`);
        await queryRunner.query(`DROP INDEX "IDX_8f9e3ddfe591e039e6d1c76112"`);
        await queryRunner.query(`DROP INDEX "IDX_929b5a2c93bd87762cbf5228b1"`);
        await queryRunner.query(`CREATE TABLE "temporary_song_mood_mood" ("songId" integer NOT NULL, "moodId" integer NOT NULL, CONSTRAINT "FK_8f9e3ddfe591e039e6d1c76112b" FOREIGN KEY ("songId") REFERENCES "song" ("id") ON DELETE CASCADE ON UPDATE CASCADE, CONSTRAINT "FK_929b5a2c93bd87762cbf5228b10" FOREIGN KEY ("moodId") REFERENCES "mood" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, PRIMARY KEY ("songId", "moodId"))`);
        await queryRunner.query(`INSERT INTO "temporary_song_mood_mood"("songId", "moodId") SELECT "songId", "moodId" FROM "song_mood_mood"`);
        await queryRunner.query(`DROP TABLE "song_mood_mood"`);
        await queryRunner.query(`ALTER TABLE "temporary_song_mood_mood" RENAME TO "song_mood_mood"`);
        await queryRunner.query(`CREATE INDEX "IDX_8f9e3ddfe591e039e6d1c76112" ON "song_mood_mood" ("songId") `);
        await queryRunner.query(`CREATE INDEX "IDX_929b5a2c93bd87762cbf5228b1" ON "song_mood_mood" ("moodId") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "IDX_929b5a2c93bd87762cbf5228b1"`);
        await queryRunner.query(`DROP INDEX "IDX_8f9e3ddfe591e039e6d1c76112"`);
        await queryRunner.query(`ALTER TABLE "song_mood_mood" RENAME TO "temporary_song_mood_mood"`);
        await queryRunner.query(`CREATE TABLE "song_mood_mood" ("songId" integer NOT NULL, "moodId" integer NOT NULL, PRIMARY KEY ("songId", "moodId"))`);
        await queryRunner.query(`INSERT INTO "song_mood_mood"("songId", "moodId") SELECT "songId", "moodId" FROM "temporary_song_mood_mood"`);
        await queryRunner.query(`DROP TABLE "temporary_song_mood_mood"`);
        await queryRunner.query(`CREATE INDEX "IDX_929b5a2c93bd87762cbf5228b1" ON "song_mood_mood" ("moodId") `);
        await queryRunner.query(`CREATE INDEX "IDX_8f9e3ddfe591e039e6d1c76112" ON "song_mood_mood" ("songId") `);
        await queryRunner.query(`ALTER TABLE "mood" RENAME TO "temporary_mood"`);
        await queryRunner.query(`CREATE TABLE "mood" ("id" integer PRIMARY KEY NOT NULL, "name" text, "color" text DEFAULT ('#77ee77'), "icon" text)`);
        await queryRunner.query(`INSERT INTO "mood"("id", "name", "color", "icon") SELECT "id", "name", "color", "icon" FROM "temporary_mood"`);
        await queryRunner.query(`DROP TABLE "temporary_mood"`);
        await queryRunner.query(`ALTER TABLE "song" RENAME TO "temporary_song"`);
        await queryRunner.query(`CREATE TABLE "song" ("title" text, "path" text, "artist" text, "duration" integer, "album" text, "favorite" integer DEFAULT ('false'), "in" integer, "out" integer, "metadata" text, "id" integer PRIMARY KEY NOT NULL, "lastScanned" datetime, "muid" text, "position" integer, "thumbnail" text)`);
        await queryRunner.query(`INSERT INTO "song"("title", "path", "artist", "duration", "album", "favorite", "in", "out", "metadata", "id", "lastScanned", "muid", "position", "thumbnail") SELECT "title", "path", "artist", "duration", "album", "favorite", "in", "out", "metadata", "id", "lastScanned", "muid", "position", "thumbnail" FROM "temporary_song"`);
        await queryRunner.query(`DROP TABLE "temporary_song"`);
        await queryRunner.query(`ALTER TABLE "song" RENAME TO "temporary_song"`);
        await queryRunner.query(`CREATE TABLE "song" ("title" text, "path" text, "artist" text, "duration" integer, "album" text, "favorite" integer DEFAULT ('false'), "in" integer, "out" integer, "metadata" text, "mood" text DEFAULT (''), "id" integer PRIMARY KEY NOT NULL, "lastScanned" datetime, "muid" text, "position" integer, "thumbnail" text)`);
        await queryRunner.query(`INSERT INTO "song"("title", "path", "artist", "duration", "album", "favorite", "in", "out", "metadata", "id", "lastScanned", "muid", "position", "thumbnail") SELECT "title", "path", "artist", "duration", "album", "favorite", "in", "out", "metadata", "id", "lastScanned", "muid", "position", "thumbnail" FROM "temporary_song"`);
        await queryRunner.query(`DROP TABLE "temporary_song"`);
        await queryRunner.query(`DROP INDEX "IDX_929b5a2c93bd87762cbf5228b1"`);
        await queryRunner.query(`DROP INDEX "IDX_8f9e3ddfe591e039e6d1c76112"`);
        await queryRunner.query(`DROP TABLE "song_mood_mood"`);
        await queryRunner.query(`CREATE UNIQUE INDEX "song_path_unique" ON "song" ("path") `);
    }

}
