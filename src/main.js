// mvvm
buildModelView = bindViewModel(buildModelView)
moveFailure = bindViewModel(moveFailure)
moveSuccess = bindViewModel(moveSuccess)

// app
initializeApplication();
goToLevel(1);
