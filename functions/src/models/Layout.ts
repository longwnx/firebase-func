import mongoose, {Schema} from "mongoose";

interface Iconset {
  color: string;
  name: string;
  selectedColor: string;
}

interface Title {
  textColor: string;
  selectedTextColor: string;
  visible: boolean;
  text: string;
}

interface Page {
  type: string;
  id: string;
  title?: Title;
}

interface BottomTab {
  iconset: Iconset;
  page: Page;
  title: Title;
  id: string;
}

interface Logo {
  src: string;
  ratio: number;
  width: number;
  height: number;
}

interface Layout {
  backgroundColor: string;
}

interface Colour {
  primary: string;
  secondary: string;
  badge: string;
  brand: string;
}

interface Font {
  family: string;
}

interface Icon {
  style: string;
  size: number;
}

interface Corner {
  style: string;
}

interface Image {
  style: string;
}

interface Theme {
  logo: Logo;
  layout: Layout;
  colour: Colour;
  font: Font;
  icon: Icon;
  corner: Corner;
  image: Image;
}

export interface LayoutData {
  appKey: string;
  page: null;
  topTabs: null;
  bottomTabs: BottomTab[];
  theme: Theme;
  defaultActive: boolean;
  id: string;
}

const layoutSchema = new Schema<LayoutData>({
  appKey: {type: String, required: true},
  page: {type: Schema.Types.Mixed, required: false},
  topTabs: {type: Schema.Types.Mixed, required: false},
  bottomTabs: [{type: Schema.Types.Mixed, required: true}],
  theme: {type: Schema.Types.Mixed, required: true},
  defaultActive: {type: Boolean, required: true},
  id: {type: String, required: true},
});

export default mongoose.model<LayoutData>("Layout", layoutSchema);
