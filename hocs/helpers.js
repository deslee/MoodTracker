export const copyCommonStaticMethods = (Wrapper, BoundComponent) => {
    if (BoundComponent.navigationOptions) {
        Wrapper.navigationOptions = BoundComponent.navigationOptions;
    }
}