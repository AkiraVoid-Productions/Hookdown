import type {
  IRange,
  Selection,
  editor,
} from 'monaco-editor/esm/vs/editor/editor.api.d.ts';

/**
 * A class that provides many useful tools to simplify the access to
 * `MonacoEditor` APIs.
 *
 * @class EditorManager
 */
class EditorManager {
  private _editor: editor.IStandaloneCodeEditor;
  /**
   * Get the editor instance of this object.
   *
   * @memberof EditorManager
   * @readonly
   */
  public get editor() {
    return this._editor;
  }

  /**
   * Get the user selected text in the editor.
   *
   * @memberof EditorManager
   * @readonly
   */
  public get selectedText() {
    return this._editor
      .getModel()
      ?.getValueInRange(this._editor.getSelection() ?? this.getDefaultRange());
  }

  /**
   * Creates an instance of EditorManager.
   *
   * @memberof EditorManager
   * @param {editor.IStandaloneCodeEditor} editor The editor that this instance
   *   want to access to.
   */
  constructor(editor: editor.IStandaloneCodeEditor) {
    this._editor = editor;
  }

  /**
   * Set user selection to given referenced selection plus range offset.
   *
   * @memberof EditorManager
   * @param {IRange} offset The offset that will be used to calculate new
   *   selection range.
   * @param {Selection} [referencedSelection] The referenced selection that new
   *   selection is calculated from.
   */
  public setSelectionByRangeOffset(
    offset: IRange,
    referencedSelection?: Selection
  ) {
    const selection = referencedSelection
      ? this.createRangeBySelection(referencedSelection)
      : this.createRange(1, 1, 1, 1);

    const newSelection = this.createRange(
      selection.startLineNumber + offset.startLineNumber,
      selection.startColumn + offset.startColumn,
      selection.endLineNumber + offset.endLineNumber,
      selection.endColumn + offset.endColumn
    );
    this._editor.setSelection(newSelection);
  }

  /**
   * Get a default range that refer to the first column of first line.
   *
   * @memberof EditorManager
   * @returns {IRange} A default range that refer to the first column of first
   *   line.
   */
  public getDefaultRange = () => this.createRange(1, 1, 1, 1);

  /**
   * Create an object that implements `IRange` by the given parameters.
   *
   * @memberof EditorManager
   * @param {number} startLineNumber Specify which line the range starts from.
   * @param {number} startColumn Specify which column the range starts from.
   * @param {number} endLineNumber Specify which line the range ends to.
   * @param {number} endColumn Specify which column the range ends to.
   * @returns {IRange} An object that implements `IRange`.
   */
  public createRange = (
    startLineNumber: number,
    startColumn: number,
    endLineNumber: number,
    endColumn: number
  ) =>
    ({
      startColumn,
      startLineNumber,
      endColumn,
      endLineNumber,
    } as IRange);

  /**
   * Receive a `Selection` object as parameter, create an object that implements
   * `IRange` which refers to the same range of given `Selection` object.
   *
   * @memberof EditorManager
   * @param {Selection} selection
   * @returns {IRange} An object that implements `IRange` which refers to the
   *   same range of given `Selection` object.
   */
  public createRangeBySelection(selection: Selection) {
    return this.createRange(
      selection.selectionStartLineNumber,
      selection.selectionStartColumn,
      selection.positionLineNumber,
      selection.positionColumn
    );
  }

  /**
   * Get the texts in given range.
   *
   * @memberof EditorManager
   * @param {IRange} range A range that contains texts.
   * @returns {string | undefined} If there are texts in given range, return
   *   those texts, otherwise returns `undefined` for no model and `""` for no
   *   texts.
   */
  public getTextInRange(range: IRange) {
    return this._editor.getModel()?.getValueInRange(range);
  }

  /**
   * Compute the final range by offset.
   *
   * @memberof EditorManager
   * @param {IRange} rangeOffset The offset used to compute with.
   * @param {IRange} [referenceRange] The referenced range used to compute from.
   * @returns {IRange} The computed range.
   */
  public computeRangeByOffset(rangeOffset: IRange, referenceRange?: IRange) {
    referenceRange ??= this.getDefaultRange();

    return this.createRange(
      referenceRange.startLineNumber + rangeOffset.startLineNumber,
      referenceRange.startColumn + rangeOffset.startColumn,
      referenceRange.endLineNumber + rangeOffset.endLineNumber,
      referenceRange.endColumn + rangeOffset.endColumn
    );
  }

  /**
   * Get the texts before user selection.
   *
   * @memberof EditorManager
   * @returns {string | undefined} Texts if they exist, otherwise `undefined`.
   */
  public getTextBeforeSelection() {
    const selectedText = this.selectedText;
    const selection = this._editor.getSelection();
    const beforeText = selection
      ? this.getTextInRange(
          this.computeRangeByOffset(
            this.createRange(
              0,
              -selection.selectionStartColumn + 1,
              0,
              selectedText ? -selectedText.length : 0
            ),
            this.createRangeBySelection(selection)
          )
        )
      : undefined;
    return beforeText;
  }

  /**
   * Replace user selection with given texts.
   *
   * @memberof EditorManager
   * @param {string} text The texts that will be replaced in.
   * @param {IRange} [rangeOffset] An offset to user selection range, will be
   *   applied to selection after replacement finished.
   */
  public replaceSelection(text: string, rangeOffset?: IRange) {
    const selection = this._editor.getSelection();
    if (selection) {
      this._editor.executeEdits('EditorManager', [{ text, range: selection }]);
      if (rangeOffset) {
        this.setSelectionByRangeOffset(rangeOffset, selection);
      }
    }
  }

  /**
   * Add inline marks to selected texts.
   *
   * @memberof EditorManager
   * @param {`${string}$${string}`} marker The marker The markers that should be
   *   added.
   * @param {IRange} rangeOffset An offset to user selection range, will be
   *   applied to selection after replacement finished.
   */
  public addInlineMarks(marker: `${string}$${string}`, rangeOffset?: IRange) {
    this.replaceSelection(
      marker.replace('$', this.selectedText ?? ''),
      rangeOffset
    );
  }

  /**
   * Add block marks to selected texts.
   *
   * @memberof EditorManager
   * @param {`${string | ''}$${string | ''}`} marker The marker The markers that
   *   should be added.
   * @param {number} [markerLength] The length of markers before the texts,
   *   defaults to 0.
   */
  public addBlockMarks(
    marker: `${string | ''}$${string | ''}`,
    markerLength: number = 0
  ) {
    const selectedText = this.selectedText;
    const beforeText = this.getTextBeforeSelection();
    const selection = this._editor.getSelection();
    this.replaceSelection(
      `${beforeText ? '\n\n' : ''}${marker.replace(
        '$',
        selectedText ?? ''
      )}\n\n`
    );
    const range = selection
      ? this.createRangeBySelection(selection)
      : this.getDefaultRange();
    this._editor.setSelection(
      this.createRange(
        beforeText ? range.startLineNumber + 2 : range.startLineNumber,
        markerLength + 1,
        beforeText ? range.endLineNumber + 2 : range.endLineNumber,
        markerLength + 1 + (selectedText?.length ?? 0)
      )
    );
  }

  /**
   * Add block marks to selected texts.
   *
   * @memberof EditorManager
   * @param {`${string}$${string}`} marker The marker The markers that should be
   *   added.
   * @param {IRange} rangeOffset An offset to user selection range, will be
   *   applied to selection after replacement finished.
   */
  public addBlockMarksWithRangeOffset(
    marker: `${string | ''}$${string | ''}`,
    rangeOffset?: IRange
  ) {
    const selectedText = this.selectedText;
    const beforeText = this.getTextBeforeSelection();
    this.replaceSelection(
      `${beforeText ? '\n\n' : ''}${marker.replace(
        '$',
        selectedText ?? ''
      )}\n\n`,
      rangeOffset
    );
  }
}

export default EditorManager;
