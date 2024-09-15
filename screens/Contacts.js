import React, {useState, useEffect} from "react";
import { StyleSheet, Text, View, FlatList, ActivityIndicator } from "react-native";
import { fetchContacts} from '../utils/api';
import ContactListItem from "../component/ContactListItem";

const keyExtrator = ({phone}) => phone;
const Contacts = ({navigation})=>
{
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        fetchContacts()
        .then(
            contacts=>{
                setContacts(contacts);
                setLoading(false);
                setError(false);
            }
        )
        .catch(
            e=>{
                console.log(e);
                setLoading(false);
                setError(true);
            }
        )
    }, [])

    const contactsSorted = contacts.sort((a, b) => a.name.localeCompare(b.name));
    const renderContact = ({item}) =>{
        const { name, avatar, phone } = item;
        return <ContactListItem
                    name={name}
                    avatar={avatar}
                    phone={phone}
                    onPress={() => navigation.navigate('Profile', { contact: item })}
                />;
    };
    return (
        <View style = {styles.container}>
            {loading && <ActivityIndicator color = "blue" size = "large"/>}
            {error && <Text>Error...</Text>}
            {!loading && !error && (
                <FlatList
                    data = {contactsSorted}
                    keyExtractor={keyExtrator}
                    renderItem={renderContact}
                />
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        justifyContent: 'center',
        flex: 1,
    },
})

export default Contacts;