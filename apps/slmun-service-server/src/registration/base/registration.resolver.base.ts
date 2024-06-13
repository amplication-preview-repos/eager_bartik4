/*
------------------------------------------------------------------------------ 
This code was generated by Amplication. 
 
Changes to this file will be lost if the code is regenerated. 

There are other ways to to customize your code, see this doc to learn more
https://docs.amplication.com/how-to/custom-code

------------------------------------------------------------------------------
  */
import * as graphql from "@nestjs/graphql";
import { GraphQLError } from "graphql";
import { isRecordNotFoundError } from "../../prisma.util";
import { MetaQueryPayload } from "../../util/MetaQueryPayload";
import * as nestAccessControl from "nest-access-control";
import * as gqlACGuard from "../../auth/gqlAC.guard";
import { GqlDefaultAuthGuard } from "../../auth/gqlDefaultAuth.guard";
import * as common from "@nestjs/common";
import { AclFilterResponseInterceptor } from "../../interceptors/aclFilterResponse.interceptor";
import { AclValidateRequestInterceptor } from "../../interceptors/aclValidateRequest.interceptor";
import { Registration } from "./Registration";
import { RegistrationCountArgs } from "./RegistrationCountArgs";
import { RegistrationFindManyArgs } from "./RegistrationFindManyArgs";
import { RegistrationFindUniqueArgs } from "./RegistrationFindUniqueArgs";
import { CreateRegistrationArgs } from "./CreateRegistrationArgs";
import { UpdateRegistrationArgs } from "./UpdateRegistrationArgs";
import { DeleteRegistrationArgs } from "./DeleteRegistrationArgs";
import { Event } from "../../event/base/Event";
import { User } from "../../user/base/User";
import { RegistrationService } from "../registration.service";
@common.UseGuards(GqlDefaultAuthGuard, gqlACGuard.GqlACGuard)
@graphql.Resolver(() => Registration)
export class RegistrationResolverBase {
  constructor(
    protected readonly service: RegistrationService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @graphql.Query(() => MetaQueryPayload)
  @nestAccessControl.UseRoles({
    resource: "Registration",
    action: "read",
    possession: "any",
  })
  async _registrationsMeta(
    @graphql.Args() args: RegistrationCountArgs
  ): Promise<MetaQueryPayload> {
    const result = await this.service.count(args);
    return {
      count: result,
    };
  }

  @common.UseInterceptors(AclFilterResponseInterceptor)
  @graphql.Query(() => [Registration])
  @nestAccessControl.UseRoles({
    resource: "Registration",
    action: "read",
    possession: "any",
  })
  async registrations(
    @graphql.Args() args: RegistrationFindManyArgs
  ): Promise<Registration[]> {
    return this.service.registrations(args);
  }

  @common.UseInterceptors(AclFilterResponseInterceptor)
  @graphql.Query(() => Registration, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "Registration",
    action: "read",
    possession: "own",
  })
  async registration(
    @graphql.Args() args: RegistrationFindUniqueArgs
  ): Promise<Registration | null> {
    const result = await this.service.registration(args);
    if (result === null) {
      return null;
    }
    return result;
  }

  @common.UseInterceptors(AclValidateRequestInterceptor)
  @graphql.Mutation(() => Registration)
  @nestAccessControl.UseRoles({
    resource: "Registration",
    action: "create",
    possession: "any",
  })
  async createRegistration(
    @graphql.Args() args: CreateRegistrationArgs
  ): Promise<Registration> {
    return await this.service.createRegistration({
      ...args,
      data: {
        ...args.data,

        event: args.data.event
          ? {
              connect: args.data.event,
            }
          : undefined,

        user: args.data.user
          ? {
              connect: args.data.user,
            }
          : undefined,
      },
    });
  }

  @common.UseInterceptors(AclValidateRequestInterceptor)
  @graphql.Mutation(() => Registration)
  @nestAccessControl.UseRoles({
    resource: "Registration",
    action: "update",
    possession: "any",
  })
  async updateRegistration(
    @graphql.Args() args: UpdateRegistrationArgs
  ): Promise<Registration | null> {
    try {
      return await this.service.updateRegistration({
        ...args,
        data: {
          ...args.data,

          event: args.data.event
            ? {
                connect: args.data.event,
              }
            : undefined,

          user: args.data.user
            ? {
                connect: args.data.user,
              }
            : undefined,
        },
      });
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new GraphQLError(
          `No resource was found for ${JSON.stringify(args.where)}`
        );
      }
      throw error;
    }
  }

  @graphql.Mutation(() => Registration)
  @nestAccessControl.UseRoles({
    resource: "Registration",
    action: "delete",
    possession: "any",
  })
  async deleteRegistration(
    @graphql.Args() args: DeleteRegistrationArgs
  ): Promise<Registration | null> {
    try {
      return await this.service.deleteRegistration(args);
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new GraphQLError(
          `No resource was found for ${JSON.stringify(args.where)}`
        );
      }
      throw error;
    }
  }

  @common.UseInterceptors(AclFilterResponseInterceptor)
  @graphql.ResolveField(() => Event, {
    nullable: true,
    name: "event",
  })
  @nestAccessControl.UseRoles({
    resource: "Event",
    action: "read",
    possession: "any",
  })
  async getEvent(
    @graphql.Parent() parent: Registration
  ): Promise<Event | null> {
    const result = await this.service.getEvent(parent.id);

    if (!result) {
      return null;
    }
    return result;
  }

  @common.UseInterceptors(AclFilterResponseInterceptor)
  @graphql.ResolveField(() => User, {
    nullable: true,
    name: "user",
  })
  @nestAccessControl.UseRoles({
    resource: "User",
    action: "read",
    possession: "any",
  })
  async getUser(@graphql.Parent() parent: Registration): Promise<User | null> {
    const result = await this.service.getUser(parent.id);

    if (!result) {
      return null;
    }
    return result;
  }
}
