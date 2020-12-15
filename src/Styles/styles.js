import { COLORS } from './colors';

export const STYLES = {
    container: {
        alignItems: 'center'
    },
    backButtonContainer: {
        marginLeft: 20,
        marginTop: 20,
        flexDirection: 'row'
    },
    backButton: {
        fontSize: 20,
        color: COLORS.primary,
        fontWeight: 'bold'
    },
    qrBorder: {
        borderStyle: 'dashed',
        borderRadius: 1,
        borderWidth: 2,
        borderColor: COLORS.primary
    },
    card: {
        marginVertical: 20,
        backgroundColor: 'white'
    },
    buttonHeader: {
        marginVertical: 100
    },
    header: {
        alignSelf: 'center',
        fontSize: 35,
        color: COLORS.primary,
        fontWeight: 'bold',
        marginVertical: 15
    },
    form: {
        marginVertical: 15
    },
    slide: {
        flex: 1
    },
    save: {
        marginHorizontal: 75,
        marginTop: 25,
        alignItems: 'center'
    },
    textInput: {
        marginVertical: 10,
        borderColor: COLORS.primary,
        borderWidth: 1,
        borderRadius: 5,
        paddingLeft: 5,
        paddingVertical: 10,
        marginHorizontal: 25,
    },
    buttonPrimary: {
        borderColor: COLORS.primary,
        paddingVertical: 10,
        paddingHorizontal: 25,
        borderWidth: 2,
        borderRadius: 10
    },
    bCardButton: {
        borderColor: COLORS.primary,
        paddingVertical: 10,
        borderWidth: 2,
        borderRadius: 10
    },
    buttonText: {
        color: COLORS.primary,
        fontWeight: 'bold',
        textAlign: 'center'
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
        marginHorizontal: 25
    },
    instructions: {
        color: COLORS.primary,
        fontSize: 18,
        fontWeight: 200
    },
    bodyHeader: {
        color: COLORS.grey,
        fontSize: 22,
        lineHeight: 40,
        textAlign: 'center'
    },
    bodyText: {
        color: COLORS.primary,
        alignSelf: 'center',
        textAlign: 'center',
        fontSize: 20,
        marginTop: 15
    }
}