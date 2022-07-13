import { ContentResolver, FirstVisibleChildLayout } from 'cx/ui';
import { DocumentTitle, RedirectRoute, Route } from 'cx/widgets';
import { PageNotImplemented } from '../components/PageNotImplemented';
import { SandboxedRoute } from '../components/SandboxedRoute';
import { CheckerLayout } from '../layout/CheckerLayout';
import About from './about';
import Article from './article';
import Articles from './articles';
import Dashboard from './dashboard';
import InvoiceRoutes from './invoices';
import Pages from './pages';
import SignIn from './pages/sign-in';
import Praksa from './praksa';
import Products from './products';
import Widgets from './widgets';
import Window from './window';

export default () => (
   <cx>
      <FirstVisibleChildLayout>
         <Route route="~/pages" url-bind="url" prefix>
            <Pages />
         </Route>

         <SignIn visible-expr="!{user}" />

         <RedirectRoute route="~/" redirect="~/dashboard" url-bind="url" />

         <CheckerLayout>
            <SandboxedRoute route="~/dashboard">
               <Dashboard />
            </SandboxedRoute>

            <SandboxedRoute route="~/window">
               <Window />
            </SandboxedRoute>

            <SandboxedRoute route="~/products">
               <Products />
            </SandboxedRoute>

            <SandboxedRoute route="~/praksa">
               <Praksa />
            </SandboxedRoute>

            <SandboxedRoute route="~/articles">
               <Articles />
            </SandboxedRoute>

            <SandboxedRoute route="~/articles/:id">
               <Article />
            </SandboxedRoute>

            <Route route="~/customers" url-bind="url" prefix>
               <PageNotImplemented />
            </Route>
            <Route route="~/settings" url-bind="url" prefix>
               <PageNotImplemented />
            </Route>
            <Route route="~/users" url-bind="url" prefix>
               <PageNotImplemented />
            </Route>
            {InvoiceRoutes}
            <Route route="~/widgets" url-bind="url" prefix>
               <Widgets />
            </Route>
            <Route route="~/about" url-bind="url">
               <About />
            </Route>
         </CheckerLayout>
      </FirstVisibleChildLayout>

      <ContentResolver
         visible-expr="!!{user}"
         params={1}
         onResolve={() => import(/* webpackChunkName: "user-routes" */ './user').then((x) => x.default)}
      />
      <ContentResolver
         params={1}
         onResolve={() => import(/* webpackChunkName: "overlays" */ '../overlays').then((x) => x.default)}
      />
      <DocumentTitle append text="Demo App" separator=" | " />
   </cx>
);
