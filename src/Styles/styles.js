import { COLORS } from './colors';

export const STYLES = {
    container: {
        flex: 1,
        backgroundColor: COLORS.background
    },
    fullCard: {
        flex: 1,
        marginHorizontal: 15,
        marginBottom: 15,
        backgroundColor: 'white',
        borderRadius: 15,
        borderColor: COLORS.secondary,
        borderWidth: 5
    },
    card: {
        marginHorizontal: 15,
        marginVertical: 20,
        backgroundColor: 'white',
        borderRadius: 15,
        borderColor: COLORS.primary,
        borderWidth: 5
    },
    header: {
        alignSelf: 'center',
        fontSize: 40,
        color: COLORS.primary,
        fontWeight: 'bold',
        marginVertical: 15
    },
    form: {
        flex: 1,
        flexDirection: 'column',
        marginVertical: 15
    },
    textInput: {
        marginVertical: 10,
        borderColor: COLORS.primary,
        borderWidth: 1,
        borderRadius: 5,
        paddingLeft: 5,
        paddingVertical: 5,
        marginHorizontal: 25,
    },
    button: {
        paddingVertical: 10,
        paddingHorizontal: 25,
        borderWidth: 2,
        borderRadius: 10
    },
    buttonPrimary: {
        borderColor: COLORS.primary
    },
    buttonText: {
        color: COLORS.primary,
        fontWeight: 'bold'
    },
    cardBody: {
        color: COLORS.primary,
        fontWeight: 'bold',
        alignSelf: 'center',
        borderBottomWidth: 1,
        borderBottomColor: 'grey'
    },
    instructionsContainer: {
        alignItems: 'center',
        marginVertical: 20,
        marginHorizontal: 10,
        flex: 1
    },
    instructions: {
        color: COLORS.primary,
        fontSize: 18,
        fontWeight: 200
    },
    bodyHeader: {
        color: COLORS.primary,
        fontSize: 28,
        fontWeight: 'bold'
    },
    bodyText: {
        color: COLORS.primary,
        alignSelf: 'flex-start',
        fontSize: 20,
        marginTop: 15
    }
}