import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Disease {
    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column()
    definition: string;
    
    @Column()
    orphaCode: number;
    
    @Column()
    preferredTerm: string;
    
    @Column()
    status: string;
    
    @Column()
    dateGenerated: string;
}
