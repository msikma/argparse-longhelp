/**
 * argparse-longhelp - Adds an extra help paragraph to an argparse instance
 * Copyright © 2018, Michiel Sikma. MIT license.
 */

const HelpFormatter = require('argparse/lib/help/formatter')

const addLongHelp = (parser, longHelp) => {
  parser.formatHelp = () => {
    // Here we do some messing around with the private ArgumentParser API in order to
    // get extra text to show up. You're never supposed to do that, but oh well.
    const formatter = new HelpFormatter({ prog: parser.prog })
    formatter.addUsage(parser.usage, parser._actions, parser._mutuallyExclusiveGroups)
    formatter.addText(parser.description)
    // Add the long help text without filtering the text formatting.
    formatter._addItem(str => str, [longHelp])
    parser._actionGroups.forEach((actionGroup) => {
      formatter.startSection(actionGroup.title)
      formatter.addText(actionGroup.description)
      formatter.addArguments(actionGroup._groupActions)
      formatter.endSection()
    });
    formatter.addText(parser.epilog)
    return formatter.formatHelp()
  }
}

module.exports = addLongHelp