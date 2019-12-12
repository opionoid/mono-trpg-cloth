import * as PIXI from "pixi.js";

export class TextAnimation {
  public app: PIXI.Application = new PIXI.Application({
    antialias: true,
    transparent: true,
    width: 300,
    height: 150,
    resolution: window.devicePixelRatio || 1
  });
  public container: PIXI.Container = new PIXI.Container();
  public textStyle: PIXI.TextStyle = new PIXI.TextStyle({
    fontFamily: "Arial",
    fontSize: 24,
    fill: 0xff1010,
    align: "center"
  });

  /**
   * PIXIアプリケーションをCanvasに追加して文字を描画します
   * @param elementId 追加するElementのid
   * @param text 描画するテキスト
   * @param width テキスト全体の幅（任意）
   * @param height テキスト全体の高さ（任意）
   */
  public init(
    elementId: string,
    text: string,
    width?: number,
    height?: number
  ): void {
    if (width && height) {
      this.app.view.width = width;
      this.app.view.height = height;
    }

    /** canvas にPIXIアプリケーションを追加 */
    const dom: HTMLElement | null = document.getElementById(elementId);
    if (dom) dom.appendChild(this.app.view);

    /** PIXIアプリケーションにコンテナを追加 */
    this.app.stage.addChild(this.container);

    /**
     * 文字のレイアウト
     */
    const textSprite: PIXI.Text = new PIXI.Text(text, this.textStyle);
    textSprite.x = 0;
    textSprite.y = this.app.view.height / 2;
    this.container.addChild(textSprite);

    textSprite.interactive = true;
    const filter = new PIXI.filters.DisplacementFilter(textSprite);
    textSprite.on("mouseover", () => {
      textSprite.filters = [filter];
    });
    textSprite.on("mouseleft", () => {
      textSprite.filters = [];
    });

    this.app.renderer.render(this.container);
  }
}
