import { createContext, useState, useEffect } from "react";

export const AppContext = createContext(null);

const AppProvider = ({children}) => {
    const [store, setStore] = useState({
        contacts: [], 
    });

    const actions = {
        getContacts: async () => {
            const url = 'https://playground.4geeks.com/contact/agendas/dev_ecg/contacts';
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    if (response.status === 404) {
                        console.log("Error. Agenda not found");
                        await actions.createAgenda();
                        return actions.getContacts();
                    }
                    throw new Error (`Error: ${response.status}`);
                }

                const data = await response.json();
                setStore(prevStore => ({ ...prevStore, contacts: data.contacts}));
        
            } catch (error) {
                console.log("Error", error);
            }
        },

        createAgenda: async () => {
            const url = 'https://playground.4geeks.com/contact/agendas/dev_ecg/contacts';
            const options = {
                method: "POST", 
                headers: {"Content-Type": "application/json"}, 
                body: JSON.stringify({})
            };
            try {
                const response = await fetch(url, options);
                if (!response.ok) {
                    if (response.status === 400) {
                        console.log("Agenda already exist");
                        return;
                    }
                    throw new Error(`Error: ${response.status}`);
                }
                console.log("Agenda has been created succesfully");

            } catch (error) {
                console.log("Error", error);
            }
        }, 

        createContact: async (newContact) => {
            const url = 'https://playground.4geeks.com/contact/agendas/ecg/contacts';
                const options = {
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify(newContact)
                };
            try {
                const response = await fetch(url, options);
                if (!response.ok) {
                    throw new Error (`Error: ${response.status}`);

                }
                console.log("Contact has been created succesfully");
                await actions.getContacts();
                return true;

            }
            catch (error) {
                console.log("Error", error);
                return false; 
            }
        },

        updateContact: async (contactId, updatedContact) => {
            const url = 'https://playground.4geeks.com/contact/agendas/dev_ecg/contacts/${contactId}';
            const options = {
                method: "PUT", 
                headers: {"Content-Type" : "application/json"},
                body: JSON.stringify(updatedContact)
            };
            try {
                const response = await fetch(url, options);
                if (!response.ok) {
                    throw new Error(`Error: ${response.status}`);

                }
                console.log("Contact has been updated");
                await actions.getContacts();
                return true;
            }
            catch (error) {
                console.error("Error", error);
                return false;
            }
        },

        deleteContact: async (contactId) => {
            const url = 'https://playground.4geeks.com/contact/agendas/dev_ecg/contacts/${contactId}';
            const options = {
                method: "DELETE", 
            }; 
            try {
                const response = await fetch(url, options);
                if (!response.ok) {
                    throw new Error(`Error: ${response.status}`);

                }
                console.log("Contact deleted succesfully");
                await actions.getContacts();
                return true; 

            }
            catch (error) {
                console.error("Error", error);
                return false;
            }
        }
    };

    useEffect (() => {
        actions.getContacts();
    }, []);

    return (
        <AppContext.Provider value={{store, actions}}>
            {children}
        </AppContext.Provider>
    );
};

export default AppProvider;