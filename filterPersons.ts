type User = {
    id: number;
    name: string;
    email: string;
    type: 'user';
};

type Admin = {
    id: number;
    name: string;
    adminLevel: number;
    type: 'admin';
};

type Person = User | Admin;

function filterPersons<T extends 'user' | 'admin'>(
    personType: T,
    criteria: Omit<Partial<T extends 'user' ? User : Admin>, 'type'>
): T extends 'user' ? User[] : Admin[] {
    const persons: Person[] = [
        { id: 1, name: 'Alice', email: 'alice@example.com', type: 'user' },
        { id: 2, name: 'Bob', adminLevel: 2, type: 'admin' }
    ];

    return persons.filter(person =>
        person.type === personType &&
        Object.entries(criteria).every(([key, value]) => (person as any)[key] === value)
    ) as any;
}

// Example usage:
const filteredUsers = filterPersons('user', { name: 'Alice' });
const filteredAdmins = filterPersons('admin', { adminLevel: 2 });
console.log(filteredUsers, filteredAdmins);
