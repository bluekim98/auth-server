import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
    name: 'user',
})
export class User {
    @PrimaryGeneratedColumn('increment', { type: 'int', name: 'id' })
    id?: number;

    @Column({ type: 'varchar', name: 'email', nullable: false, unique: true })
    email: string;

    @Column({ type: 'varchar', name: 'password', nullable: false })
    password?: string;
}
