# System Overview

Feather: 3D sketchbook light as a feather
## Yongkwan Kim
## Sketchsoft Inc., Republic of Korea
kwan@sketchsoft3d.com
## Kyuhyoung Hong
## Sketchsoft Inc., Republic of Korea
kyu@sketchsoft3d.com
## Junwon Yang
## Sketchsoft Inc., Republic of Korea
jun@sketchsoft3d.com
Figure 1: Feather is a pen & touch 3D curve drawing system to create various 3D sketches and artworks (www.feather.art).
## ABSTRACT
We present Feather, a 3D drawing system that allows users to cre-
ate 3D curve artworks with a pen & touch interface on a tablet.
We implemented multi-view 3D sketching by applying a concept
of drawing & bending a “3D guide” and a view-oriented joystick
widget that streamlines tedious 3D transformations—all of which
are integrated into a single web application while maintaining the
usability and look of conventional 2D drawing software.
## CCS CONCEPTS
• Human-centered computing -> Human computer interaction
(HCI); Interactive systems and tools.
## KEYWORDS
3D sketching, 3D drawing, 3D transformation, tablet, pen, touch
ACM Reference Format:
Yongkwan Kim, Kyuhyoung Hong, and Junwon Yang. 2023. Feather: 3D
sketchbook light as a feather. InSpecial Interest Group on Computer Graphics
and Interactive Techniques Conference Appy Hour (SIGGRAPH ’23 Appy Hour),
August 06–10, 2023, Los Angeles, CA, USA. ACM, New York, NY, USA, 2 pages.
https://doi.org/10.1145/3588427.3595355
## 1 INTRODUCTION
Advances in real-time graphics technology drive faster iteration
cycles in the creative process. Increasing outlets for 3D content,
Permission to make digital or hard copies of part or all of this work for personal or
classroom use is granted without fee provided that copies are not made or distributed
for profit or commercial advantage and that copies bear this notice and the full citation
on the first page. Copyrights for third-party components of this work must be honored.
For all other uses, contact the owner/author(s).
SIGGRAPH ’23 Appy Hour, August 06–10, 2023, Los Angeles, CA, USA
 2023 Copyright held by the owner/author(s).
ACM ISBN 979-8-4007-0156-6/23/08.
https://doi.org/10.1145/3588427.3595355
such as virtual and mixed reality, expand the demand for 3D creation
beyond the design and entertainment industries.
However, in the early stages of creation, traditional pen-and-
paper 2D sketching remains irreplaceable for capturing ideas on
a “blank slate. ” Since 2D sketches represent shapes from specific
viewpoints, transitioning to 3D geometry is fraught with informa-
tion gaps and inconsistencies. The limited ability to quickly express
3D shape ideas becomes a “bottleneck” for later iterations with
advanced 3D graphics technologies.
We developed Feather, a web-based 3D sketching application
for early 3D creation. Users can generate 3D curves from multiple
viewpoints using a 2D pen & touch input (Figure 1). Feather of-
fers a cross-device environment, allowing users to draw anywhere
and use their sketches in the subsequent 3D modeling and render-
ing process. In this paper, we detail the core design concepts and
implementation of Feather, focusing on the 3D guide and the view-
oriented joystick widget, and discuss the application and potential
of the 3D creative process facilitated by Feather.
## 2 RELATED WORK
3D sketching techniques, utilizing intuitive sketching input to gen-
erate 3D shapes, have been researched and developed for industries
such as automotive [Bae et al., 2008], architecture [Dorsey et al.,
2007], and product design [Kim and Bae, 2016, Kim et al., 2018].
These techniques have also been applied to virtual reality (Gravity
Sketch) and animation (Blender Grease Pencil).
We combine multi-view sketching [Bae et al., 2008] with sketch-
ing surfaces [Kim and Bae, 2016, Kim et al., 2018]. Our interface
transforms strokes from one viewpoint into a sketching surface
and projects strokes from other viewpoints onto it, generating 3D
curves. We implemented the system with web graphics interwork-
ing with cloud computing, similar to the latest cloud-based 2D
design (Figma) or 3D modeling (Spline) platforms.

SIGGRAPH ’23 Appy Hour, August 06–10, 2023, Los Angeles, CA, USA Yongkwan Kim et al.
## 3 FEATHER 3D SKETCHBOOK
Feather is a 3D sketching system that allows users to draw 3D
curves with different shapes, colors, and thicknesses. To streamline
the complex 3D tasks, we combined view switching and the familiar
2D sketching interface for creating and manipulating 3D curves.
## 3.1 Drawing & Bending 3D Guide
To generate a 3D curve, the unit element of Feather artwork, users
first create a “3D guide” (Figure 2). When drawing the initial stroke,
a surface as a 3D guide extrudes in the viewing direction (Figure 2a).
Subsequent strokes, drawn from different viewpoints, are projected
onto the guide, resulting in curves with 3D coordinates.
The concept of the 3D guide stems from the multi-view 3D sketch-
ing technique, where 2D input from two or more viewpoints defines
3D coordinate values. Since depth information is not determined
in the initial view, the 3D guide serves as a geometric and visual
representation of the user’s intended 3D curve. We objectify this
intermediate state, like a “bent paper, ” allowing users to examine
the shape from other viewpoints and apply additional adjustments
similar to existing modeling systems.
The bending function (Figure 2b) deforms the 3D guide surface
to follow an additional stroke from another viewpoint while pre-
serving the shape of the first stroke. For instance, a 3D guide created
by drawing a circle with the first stroke from a frontal viewpoint
would be a straight cylinder. Then if the user draws a larger circle
from a top viewpoint with the bending function enabled, the 3D
guide would be warped from the cylinder to a doughnut shape.
Depending on how much the user adds information from mul-
tiple viewpoints, the 3D guide can be used as an intermediary to
build up 3D curves with two-view 3D sketching, or it can be used
as a swept surface similar to traditional 3D modeling techniques.
## 3.2 View-oriented Joystick Widget
The view-oriented joystick widget is a 2D interface that enables
users to translate, rotate, and scale 3D curve objects (Figure 3). It
comprises a central crosshair and a translation stick in the corner
surrounded by a rotation wheel and scaling handles (Figure 1). The
widget’s key features are that the object’s translation is perpendic-
ular to the view, and the axis of rotation and scaling is fixed at the
screen center and parallel to the viewing direction.
Like drawing a 3D guide in one view and then drawing a curve in
another, users utilize the widget by repeating 2D planar movements
at multiple viewpoints to perform a 3D translation (Figure 3a).
Unlike conventional widgets that restrict object translation to fixed
X-Y-Z axes, our widget enables users to translate curves in subtle
directions by changing viewpoints. Since using our widget on X-Y-Z
views yields the same result as the conventional widgets, users can
still quickly place 3D curves with just two viewpoint maneuvers.
Users can set the center and direction of rotation just by aim-
ing the viewport at curves (Figure 3b). Since the rotation axis is
always centered on the screen, users do not have to worry about
unexpectedly rotating curves with an off-screen center and radius.
The scaling also uses the screen’s center as an anchor, eliminating
the need to translate after scaling (Figure 3c). For example, if the
user positions the airplane’s body at the screen center, scaling up
the wings will only stretch them outward from the body.
Figure 2: A first stroke (a1) creates a 3D guide (sketching
surface) extruded along the first view (a2). A bending stroke
(b1) warps the 3D guide from a different view (b2).
Figure 3: 3D curves are translated by the stick (a), rotated by
the wheel (b), and scaled by the corner handle (c).
## 3.3 Cross-device Web Application
Feather is implemented with Javascript and WebGL that runs on
top of a web browser and is available on the web (www.feather.art).
Users can continue working with 3D curve artworks synchronized
in the cloud across devices, including mobile and desktop.
## 4 CONCLUSION AND FUTURE WORK
To lower the barrier to first-time 3D expression of ideas, we devel-
oped Feather, which allows users to create 3D curve artwork using
only 2D input for navigation and object manipulation. Extruding
3D guides with 2D sketch input could be extended to include ad-
ditional surface creation techniques, such as loft and sweep. The
view-oriented joystick, which operates based on direction and cen-
ter of viewing, could also be used consistently for rigging and
animation [Lee et al., 2022] of sketch parts. The cloud web app will
enable multi-user collaboration and integration with creative tech-
nologies such as generative AI and Blender. We envision Feather
facilitating the expression of ideas in the design and entertainment
production and wherever 3D creation is needed.
## REFERENCES
Seok-Hyung Bae, Ravin Balakrishnan, and Karan Singh. 2008. ILoveSketch: as-natural-
as-possible sketching system for creating 3d curve models. In Proceedings of the
21st annual ACM symposium on User interface software and technology (UIST ’08) .
Association for Computing Machinery, New York, NY, USA, 151–160. https://doi.
org/10.1145/1449715.1449740
Julie Dorsey, Songhua Xu, Gabe Smedresman, Holly Rushmeier, and Leonard McMillan.
2007. The Mental Canvas: A Tool for Conceptual Architectural Design and Analysis.
In Proceedings of the 15th Pacific Conference on Computer Graphics and Applications
(PG ’07). IEEE Computer Society, USA, 201–210.
Yongkwan Kim and Seok-Hyung Bae. 2016. SketchingWithHands: 3D Sketching Hand-
held Products with First-Person Hand Posture. In Proceedings of the 29th Annual
Symposium on User Interface Software and Technology (UIST ’16) . Association for
Computing Machinery, New York, NY, USA, 797–808. https://doi.org/10.1145/
2984511.2984567
Yongkwan Kim, Sang-Gyun An, Joon Hyub Lee, and Seok-Hyung Bae. 2018. Agile 3D
Sketching with Air Scaffolding. In Proceedings of the 2018 CHI Conference on Human
Factors in Computing Systems (CHI ’18) . Association for Computing Machinery,
New York, NY, USA, Paper 238, 1–12. https://doi.org/10.1145/3173574.3173812
Joon Hyub Lee, Hanbit Kim, and Seok-Hyung Bae. 2022. Rapid design of articulated
objects. ACM Trans. Graph. 41, 4, Article 89 (July 2022), 8 pages. https://doi.org/10.
1145/3528223.3530092