import 'react-native-get-random-values';
import { v4 } from 'uuid';
const mapContact = contact => {
    const {
        name, picture, phone, cell, email,
    } = contact;
    return {
        id: v4(),
        name: name.first+ " "+name.last, 
        avatar: picture.large,
        phone, 
        cell,
        email,
        favorite: Math.random() >= 0.5,
    };
};

const fetchContacts = async() =>{
    const respond = await fetch('https://randomuser.me/api/?results=100&seed=fullstackio');
    const contactData = await respond.json();
    return contactData.results.map(mapContact);
};

const fetchUserContact = async() =>{
    const respond = await fetch('https://randomuser.me/api/?seed=fullstackio');
    const userData = await respond.json();
    return mapContact(userData.results[0]);
};

const fetchRandomContact = async() =>{
    const respond = await fetch('https://randomuser.me/api/');
    const userData = await respond.json();
    return mapContact(userData.results[0]);
}

export {fetchContacts, fetchUserContact, fetchRandomContact};