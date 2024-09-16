import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useRoute } from '@react-navigation/native'; // Import useRoute
import ContactThumbnail from "../component/ContactThumbnail";
import DetailListItem from "../component/DetailListItem";
import colors from "../utils/colors";

const Profile = () => {
    const route = useRoute();
    const { contact } = route.params; 
    const { avatar, name, email, phone, cell } = contact; 

    return (
        <View style={styles.container}>
            <View style={styles.avatarSection}>
                <ContactThumbnail avatar={avatar} name={name} phone={phone} />
            </View>
            <View style={styles.detailsSection}>
                <DetailListItem icon="mail" title="Email" subtitle={email} />
                <DetailListItem icon="phone" title="Work" subtitle={phone} />
                <DetailListItem icon="smartphone" title="Personal" subtitle={cell} />
            </View>
        </View>
    );
}

export default Profile;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    avatarSection: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.blue,
    },
    detailsSection: {
        flex: 1,
        backgroundColor: 'white',
    },
});