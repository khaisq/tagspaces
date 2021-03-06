/* Copyright (c) 2016-present - TagSpaces UG (Haftungsbeschraenkt). All rights reserved. */
import { delay } from './hook';
import { firstFile } from './test-utils.spec';

export const defaultLocationPath =
  './testdata/file-structure/supported-filestypes';
export const defaultLocationName = 'supported-filestypes';
export const perspectiveGridTable = '//*[@data-tid="perspectiveGridFileTable"]';
export const newLocationName = 'Location Name Changed';
export const tsFolder = '\\.ts'; // escape dot
export const selectorFile = '//*[@data-tid="perspectiveGridFileTable"]/span';
export const selectorFolder = '//*[@data-tid="perspectiveGridFileTable"]/div';

// const newHTMLFileName = 'newHTMLFile.html';
const testFolder = 'testFolder';

export async function clickOn(selector, options = {}) {
  const element = await global.client.$(selector);
  await element.waitUntil(
    async function() {
      // const displayed = await this.isDisplayed();
      const displayed = await this.isDisplayedInViewport();
      return displayed === true;
    },
    {
      timeout: 5000,
      timeoutMsg: 'clickOn selector ' + selector + ' to exist after 5s'
    }
  );
  await element.click(options);
}

export async function doubleClickOn(selector) {
  const element = await global.client.$(selector);
  await element.waitUntil(
    async function() {
      const displayed = await this.isDisplayedInViewport();
      return displayed === true;
    },
    {
      timeout: 5000,
      timeoutMsg: 'doubleClick selector ' + selector + ' to exist after 5s'
    }
  );
  await element.doubleClick();
}

export async function setInputValue(selector, value) {
  const element = await global.client.$(selector);
  await element.waitUntil(
    async function() {
      // const displayed = await this.isDisplayed();
      const displayed = await this.isDisplayedInViewport();
      return displayed === true;
    },
    {
      timeout: 5000,
      timeoutMsg: 'setInputValue selector ' + selector + ' to exist after 5s'
    }
  );
  await element.setValue(value);
}

export async function setInputKeys(tid, value) {
  const element = await global.client.$('[data-tid=' + tid + ']');
  await element.waitUntil(
    async function() {
      // const displayed = await this.isDisplayed();
      const displayed = await this.isDisplayedInViewport();
      return displayed === true;
    },
    {
      timeout: 5000,
      timeoutMsg:
        'setInputKeys selector ' + element.selector + ' to exist after 5s'
    }
  );
  await element.click();

  const elemInput = await global.client.$('[data-tid=' + tid + '] input');
  await elemInput.waitUntil(
    async function() {
      // const displayed = await this.isDisplayed();
      const displayed = await this.isDisplayedInViewport();
      return displayed === true;
    },
    {
      timeout: 5000,
      timeoutMsg:
        'setInputKeys selector ' + element.selector + ' to exist after 5s'
    }
  );

  // await elemInput.clearValue();
  await clearInputValue(elemInput);
  await element.click();
  await elemInput.keys(value);
}

export async function clearInputValue(inputElement) {
  const value = await inputElement.getValue();
  const count = value.length;
  for (let i = 0; i < count; i++) {
    const value = await inputElement.getValue();
    if (value === '') {
      break;
    }
    await inputElement.click();
    await inputElement.doubleClick();
    await global.client.keys('Delete');
    await inputElement.clearValue();
  }
}

export async function expectElementExist(selector, exist = true) {
  const element = await global.client.$(selector);
  await element.waitUntil(
    async function() {
      const displayed = await this.isDisplayed();
      return displayed === exist;
    },
    {
      timeout: 5000,
      timeoutMsg: 'expected selector to exist=' + exist + ' after 5s'
    }
  );
  expect(await element.isDisplayed()).toBe(exist);
}

export async function createLocation(
  locationPath,
  locationName,
  isDefault = false
) {
  // locationPerspective = locationPerspective || 'Grid';
  const locationManagerMenu = await global.client.$(
    '[data-tid=locationManagerPanel]'
  );
  await locationManagerMenu.click();
  const elem = await global.client.$('[data-tid=createNewLocation]');
  await elem.click();
  const lPath = await global.client.$('[data-tid=locationPath]');
  await lPath.click();
  const locationPathInput = await global.client.$(
    '[data-tid=locationPath] input'
  );
  await locationPathInput.keys(locationPath || defaultLocationPath);
  // keys is workarround for not working setValue await global.client.$('[data-tid=locationPath] input').setValue(locationPath || defaultLocationPath);
  const lName = await global.client.$('[data-tid=locationName]');
  await lName.click();
  const locationNameInput = await global.client.$(
    '[data-tid=locationName] input'
  );
  locationNameInput.keys(
    locationName || 'Test Location' + new Date().getTime()
  );
  if (isDefault) {
    await delay(1000);
    const locationIsDefault = await global.client.$(
      '[data-tid=locationIsDefault]'
    );
    await locationIsDefault.click();
  }
  const confirmLocationCreation = await global.client.$(
    '[data-tid=confirmLocationCreation]'
  );
  await confirmLocationCreation.waitForDisplayed();
  await confirmLocationCreation.click();
}

export async function settingsSetShowUnixHiddenEntries() {
  await clickOn('[data-tid=settings]');
  await global.client.pause(500);
  await clickOn('[data-tid=settingsSetShowUnixHiddenEntries]');
  await clickOn('[data-tid=closeSettingsDialog]');
}

export async function reloadDirectory() {
  await clickOn('[data-tid=folderContainerOpenDirMenu]');
  /*const openDirMenu = await global.client.$(
    '[data-tid=folderContainerOpenDirMenu]'
  );
  await openDirMenu.waitForDisplayed();
  await openDirMenu.click();
  await delay(500);*/
  await clickOn('[data-tid=reloadDirectory]');
  /*const reloadDirectory = await global.client.$('[data-tid=reloadDirectory]');
  await reloadDirectory.waitForDisplayed();
  await reloadDirectory.click();
  await delay(500);*/
}

export async function openEntry(entryName) {
  await doubleClickOn('[data-tid=fsEntryName_' + entryName + ']');
  /*const eName = await global.client.$(
    '[data-tid=fsEntryName_' + entryName + ']'
  );
  await eName.waitForDisplayed();
  await eName.doubleClick();
  await delay(500);*/
}

export async function createNewDirectory() {
  await clickOn('[data-tid=folderContainerOpenDirMenu]');
  await global.client.pause(100); // TODO the Menu is always in HTML
  await clickOn('[data-tid=newSubDirectory]');
  await global.client.pause(500);
  // set new dir name
  await setInputKeys('directoryName', testFolder);
  /*const directoryName = await global.client.$('[data-tid=directoryName] input');
  await delay(500);
  await directoryName.keys(testFolder);
  await directoryName.click();
  await delay(1500);*/
  await clickOn('[data-tid=confirmCreateNewDirectory]');
  /*const confirmCreateNewDirectory = await global.client.$(
    '[data-tid=confirmCreateNewDirectory]'
  );
  await delay(1500);
  await confirmCreateNewDirectory.waitForDisplayed();
  await confirmCreateNewDirectory.click();*/
  return testFolder;
}

export async function newHTMLFile() {
  await clickOn('[data-tid=locationManager]');
  /*const newFile = await global.client.$('[data-tid=locationManager]');
  await newFile.waitForDisplayed();
  await newFile.click();
  await delay(500);*/
  await clickOn('[data-tid=createRichTextFileButton]');
  /*const newNoteFile = await global.client.$(
    '[data-tid=createRichTextFileButton]'
  );
  await newNoteFile.waitForDisplayed();
  await newNoteFile.click();
  await delay(500);*/
}

export async function newMDFile() {
  await clickOn('[data-tid=locationManager]');
  await clickOn('[data-tid=createMarkdownButton]');
}

export async function newTEXTFile() {
  await clickOn('[data-tid=locationManager]');
  await clickOn('[data-tid=createTextFileButton]');
}

export async function closeOpenedFile() {
  await clickOn('[data-tid=fileContainerCloseOpenedFile]');
  /*const closeFile = await global.client.$(
    '[data-tid=fileContainerCloseOpenedFile]'
  );
  await closeFile.waitForDisplayed();
  await closeFile.click();
  await delay(500);*/
}

export async function deleteDirectory() {
  await clickOn('[data-tid=folderContainerOpenDirMenu]');
  await clickOn('[data-tid=deleteDirectory]');
  /*const deleteDirectory = await global.client.$('[data-tid=deleteDirectory]');
  await deleteDirectory.waitForDisplayed();
  await delay(500);
  await deleteDirectory.click();*/
  await clickOn('[data-tid=confirmDeleteDirectoryDialog]');
  /*const confirmDeleteDirectory = await global.client.$(
    '[data-tid=confirmDeleteDirectoryDialog]'
  );
  await confirmDeleteDirectory.waitForDisplayed();
  await delay(500);
  await confirmDeleteDirectory.click();
  await delay(500);*/
}

export async function disableTrashBin() {
  await clickOn('[data-tid=settings]');
  await global.client.pause(500);
  await clickOn('[data-tid=settingsSetUseTrashCan]');
  await clickOn('[data-tid=closeSettingsDialog]');
}

export async function returnDirectoryBack() {
  await clickOn('[data-tid=gridPerspectiveOnBackButton]');
  /*
  await delay(500);
  const backButton = await global.client.$(
    '[data-tid=gridPerspectiveOnBackButton]'
  );
  await backButton.click();
  await delay(500);*/
}

export async function toHaveText() {
  await delay(500);
  const file = await global.client.$(perspectiveGridTable + firstFile);
  console.log(file.getText());
  expect(file).toBe(filename);
  // const classNameAndText = await global.client.$('<img>');
  // await checkFilenameForExist(filename, selector)
  // expect(file).toEquale(expect.toHaveTextContaining('jpg'));
  // expect.stringContaining('jpg');
  // expect(text1==text2).toBe(true);
}

export async function openCloseAboutDialog(title) {
  await delay(500);
  const viewMainMenuButton = await global.client.$('#viewerMainMenuButton');
  await viewMainMenuButton.waitForDisplayed();
  await viewMainMenuButton.click();
  await delay(1500);
  const aboutButton = await global.client.$('#aboutButton');
  await aboutButton.waitForDisplayed();
  await aboutButton.click();
  await delay(1500);
  // const getTitle = await global.client.$('h4=' + title);
  // await getTitle.waitForDisplayed();
  // // should eventually equals('About HTML Viewer');
  // expect(getTitle).toBe(title);
  const closeAboutDialogButton = await global.client.$(
    '#closeAboutDialogButton'
  );
  await closeAboutDialogButton.waitForDisplayed();
  await closeAboutDialogButton.click();
  await delay(500);
}
