/**
 * argparse-longhelp - Adds an extra help paragraph to an argparse instance
 * Copyright © 2018, Michiel Sikma. MIT license.
 */

const HelpFormatter = require('argparse/lib/help/formatter')

// For some reason, argparse sometimes outputs an extra linebreak after the usage text.
// This seems to happen when the previous usage line is a precise length.
// Bit hackish, but this removes it.
const removeUnnecessaryLines = (str) => (
  str.split('\n').map(s => s.trim() === '' ? s.trim() : s).join('\n').split('\n\n\n').join('\n\n')
)

const addLongHelp = (parser, longHelp, removeLines) => {
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
    const formatted = formatter.formatHelp()
    return removeLines ? removeUnnecessaryLines(formatted) : formatted
  }
}

module.exports = addLongHelp